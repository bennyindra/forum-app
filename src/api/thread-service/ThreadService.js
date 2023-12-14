import axios from "axios"

export async function getThread(page) {
    const response = await axios.get("/v1/threads?page="+page)
    return response.data;    
}

export async function getPostThreadOwn(page,id) {
    const response = await axios.get("/v1/threads?page="+page+"&userId="+id)
    return response.data;    
}

export async function getThreadPostList(page,threadId) {
    const response = await axios.get("/v1/thread-posts?page="+page+"&threadId="+threadId)
    return response.data;    
}

export async function saveNewPost(thread) {
    const response = await axios.post("/v1/threads", thread)
    return response.data;    
}

export async function saveNewThreadPost(thread) {
    const response = await axios.post("/v1/thread-posts", thread)
    return response.data;    
}