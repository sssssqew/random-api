import IdeasAPI from "../services/IdeasAPI"

class IdeaForm{
  constructor(){
    this._formModal = document.querySelector('#form-modal')
  }
  addEventListners(){
    this._form.addEventListener('submit', this.handleSubmit.bind(this)) // 이벤트 요소가 아니라 클래스를 가리키기 위하여
  }
  render(){
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `
    this._form = document.querySelector('#idea-form')
    // console.log(this._form)
    this.addEventListners()
  }
  async handleSubmit(e){
    e.preventDefault() // 새로고침 방지
    const {text, tag, username} = this._form.elements
    console.log('submit', this._form.elements, text, tag, username)
    console.log("텍스트", text.value, "태그", tag.value, "유저", username.value)

    if(![text.value, tag.value, username.value].every(value => value)){ // 폼검증
      alert('Please enter all fields')
      return 
    }
    // save user to local storage
    localStorage.setItem('username', username.value)
    
    const idea = {
      text: text.value,
      tag: tag.value,
      username: username.value
    }
    console.log(idea)
    try{
      const newIdea = await IdeasAPI.createIdea(idea)
      if(newIdea){
        document.dispatchEvent(new Event('addIdeaToList'))
      }
    }catch(e){
      console.log(e)
    }
    this.clearFields()
    document.dispatchEvent(new Event('closeModal'))
  }
  clearFields(){
    this._form.elements.text.value = ''
    this._form.elements.tag.value = ''
    this._form.elements.username.value = ''
  }
  
}
export default IdeaForm