import IdeasAPI from "../services/IdeasAPI"

class IdeaList{
  constructor(){
    this._ideaListEl = document.querySelector('#idea-list')
    this._ideas = []
    this.getIdeas()
    this.addEventListners()

    this._validTags = new Set()
    this._validTags.add('technology')
    this._validTags.add('software')
    this._validTags.add('business')
    this._validTags.add('education')
    this._validTags.add('health')
    this._validTags.add('inventions')
  }
  addEventListners(){
    document.addEventListener('addIdeaToList', this.getIdeas.bind(this)) // 사용자 지정 이벤트 리스너
    this._ideaListEl.addEventListener('click', async (e) => {
      if(e.target.classList.contains('fa-times')){
        e.stopImmediatePropagation()
        const ideaId = e.target.parentElement.parentElement.dataset.id 
        console.log(ideaId)
        try{
          await IdeasAPI.deleteIdea(ideaId)
          await this.getIdeas()
        }catch(e){
          alert('You cannot delete this resource')
        }
      }
    })
  }
  async getIdeas(){
    try{
      const res = await IdeasAPI.getIdeas()
      this._ideas = res.data.data
      // console.log(this._ideas)
      this.render()
    }catch(e){
      console.log(e)
    }
  }
  getTagClass(tag){
    tag = tag.toLowerCase()
    let tagClass = ''
    if(this._validTags.has(tag)){
      tagClass = `tag-${tag}`
    }
    return tagClass
  }
  render(){
    this._ideaListEl.innerHTML = this._ideas.map(idea => `
      <div class="card" data-id="${idea._id}">
        ${idea.username === localStorage.getItem('username') ? 
        '<button class="delete"><i class="fas fa-times"></i></button>' : ''}
        <h3>
          ${idea.text}
        </h3>
        <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>
    `).join('')
  }

}

export default IdeaList 