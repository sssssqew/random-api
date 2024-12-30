class Modal{
  constructor(){
    this._modal = document.querySelector('#modal')
    this._modalBtn = document.querySelector('#modal-btn')
    this.addEventListners()
  }
  addEventListners(){
    this._modalBtn.addEventListener('click', this.open.bind(this)) // bind : 이벤트 요소가 아니라 클래스 객체를 가리키기 위하여
    window.addEventListener('click', this.outsideClick.bind(this))
    document.addEventListener('closeModal', this.close.bind(this)) // 사용자 지정 이벤트 리스너
  }
  open(){
    this._modal.style.display = 'block'
  }
  close(){
    this._modal.style.display = 'none'
  }
  outsideClick(e){
    // console.log(e.target)
    if(e.target === this._modal){
      this.close()
    }
  }
}
export default Modal