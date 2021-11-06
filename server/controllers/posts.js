import PostModel from '../models/postModel.js'

export const getPosts = async (req, res) => {

    try {
        const postMessages = await PostModel.find()
        
        res.status(200).json(postMessages)
        console.log("posts retrieved!")
    } catch (error) {
        res.status(404).json({message : error.message})
    }
    
}

export const createPost = async (req, res) => {
    
    //const timeStamp = Date.parse(req.body.timeStamp)
    const title = req.body.title
    const message = req.body.message
    const creator = req.body.creator
   
    
    const newPost = new PostModel({
        title,
        message,
        creator,
       // timeStamp,
    })
    try {
        await newPost.save()
        console.log("post added")
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

export const incrementLikes = async (req, res) => {
    try {

        //we can't directly modify a field based 
        //on its previous value, so we need this intermediary 
        //step to find the previous value of the likes field 
        const postID = req.params.id
        const post = await PostModel.findById(postID)
        res.status(201).json(post)
        const newLikes = post.likes + 1
        
        try {
            const post = await PostModel.findByIdAndUpdate(postID, { likes: newLikes })
            res.status(201).json(post)
            console.log(`Likes on post ${postID} incremented by 1!`)
        } catch (error){
            res.status(409).json({message : error.message})
        }
    }
    catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id,
            {
                message: req.body.message,
                title: req.body.title
            }
        )
        res.status(201).json(post)
    }
    catch (error){
        res.status(409).json({message : error.message})
    }
}



export const deletePost = async (req, res) => {
    try {
        await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).json(`Post ${req.params.id} deleted`)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}

