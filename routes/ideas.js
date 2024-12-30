const express = require('express')
const router = express.Router()
const Idea = require('../models/Idea')

router.get('/', async (req, res) => {
  try{
    const ideas = await Idea.find()
    res.json({ success: true, data: ideas })
  }catch(e){
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
  
})
router.get('/:id', async (req, res) => {
  try{
    const idea = await Idea.findById(req.params.id)
    res.json({ success: true, data: idea })
  }catch(e){
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
  // res.json({ success: true, data: ideas[req.params.id] }) // 이렇게 하면 안됨 (req.params.id는 배열ID가 아니라 데이터고유 ID이므로)
})
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username
  })
  try{
    const savedIdea = await idea.save()
    res.json({ success: true, data: savedIdea })
  }catch(e){
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
})
router.put('/:id', async (req, res) => {
  try{
    const idea = await Idea.findById(req.params.id)

    if(idea.username === req.body.username){
      const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, {
        $set: { 
          text: req.body.text,
          tag: req.body.tag
        }
      }, {
        new: true // 업데이트할게 없으면 새로 생성함
      })
      return res.json({ success: true, data: updatedIdea })
    }
    res.status(403).json({ success: false, error: 'You are not authorized to update this resource'})
  }catch(e){
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }


  // const idea = ideas.find(idea => idea.id === +req.params.id)

  // if(!idea){
  //   return res.status(404).json({ success: false, error: 'Resoure Not Found' }) // return 없으면 응답보내고, 다시 아래코드가 실행되서 응답을 또 보내려다 에러남
  // }
  // idea.text = req.body.text || idea.text 
  // idea.tag = req.body.tag || idea.tag 
  // res.json({ success: true, data: idea })
  // res.json({ success: true, data: ideas[req.params.id] }) // 이렇게 하면 안됨 (req.params.id는 배열ID가 아니라 데이터고유 ID이므로)
  
})
router.delete('/:id', async (req, res) => {
  try{
    const idea = await Idea.findById(req.params.id)
    console.log(idea.username, req.body.username)

    if(idea.username === req.body.username){
      await Idea.findByIdAndDelete(req.params.id)
      return res.json({ success: true, data: {} })
    }
    res.status(403).json({ success: false, error: 'You are not authorized to delete this resource'})
  }catch(e){
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }


  // const idea = ideas.find(idea => idea.id === +req.params.id)

  // if(!idea){
  //   return res.status(404).json({ success: false, error: 'Resoure Not Found' }) // return 없으면 응답보내고, 다시 아래코드가 실행되서 응답을 또 보내려다 에러남
  // }
  // const index = ideas.indexOf(idea)
  // ideas.splice(index, 1)
  // res.json({ success: true, data: {} })
  // res.json({ success: true, data: ideas[req.params.id] }) // 이렇게 하면 안됨 (req.params.id는 배열ID가 아니라 데이터고유 ID이므로)
})

module.exports = router 