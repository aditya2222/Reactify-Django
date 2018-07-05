import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostInline from './PostInline'
import PostCreate from './PostCreate'

class Posts extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        posts: [],
        postsListClass: "card"


    }
    loadPosts = () => {
        const endpoint = '/api/posts' // On a live server we will use a live url such as https://www.adiflashinfotech.com/api/posts
        let thisComp = this
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            }
        }

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            console.log(responseData)

            thisComp.setState({

                posts: responseData // It is a key-value pair where posts is the key and responseData is the value

            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }


    createPost = () => {
        const csrfToken = cookie.load('csrftoken')
        const endpoint = '/api/posts' // On a live server we will use a live url such as https://www.adiflashinfotech.com/api/posts
        let data = {
            "slug": "",
            "title": "",
            "content": "",
            "draft": false,
            "publish": null
        }
        if (csrfToken !== undefined) {
            let lookupOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken

                },
                body: JSON.stringify(data),
                credentials: 'include'
            }


            fetch(endpoint, lookupOptions)
                .then(function (response) {
                    return response.json()
                }).then(function (responseData) {
                console.log(responseData) //this is actually the posts
            }).catch(function (error) {
                console.log('error', error)
            })


        }

    }


    togglePostListClass = (event) => { //the fat arrow method introduced in es6 allows us to use this without calling the function in the constructor and further binding to this
        event.preventDefault()
        let currentListClass = this.state.postsListClass
        if (currentListClass === "") {


            this.setState({
                postsListClass: "card"

            })

        } else {


            this.setState({
                postsListClass: ""

            })


        }


    }

    componentDidMount() { //this is run as soon as the compoenent comes alive!
        // calls as soon as the component is mounted
        this.loadPosts()
        this.setState({
            posts: [],
            postsListClass: "card"

        })
    }

    render() {
        const csrfToken = cookie.load('csrftoken')
        const {posts} = this.state
        const {postsListClass} = this.state
        return (
            <div>
                <h1> Hello World! </h1>
                <button onClick={this.togglePostListClass}>Toggle Class</button>
                {posts.length > 0 ? posts.map((postItem, index) => {

                    return (
                        <PostInline Post={postItem} elClass={postsListClass}/> //here we pass props
                    )


                }) : <p>No Posts Found</p>}
                {/*thi is just to make sure that there is a csrf token*/}
                {(csrfToken !== undefined && csrfToken != null) ?
                    <div className='my-5'>
                        <PostCreate/>
                    </div> : " "
                }

            </div>

        )
    }
}

export default Posts
