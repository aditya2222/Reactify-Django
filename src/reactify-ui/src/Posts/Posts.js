import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostInline from './PostInline'
import {Link} from 'react-router-dom'
import PostCreate from './PostCreate'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            postsListClass: "card",
            next: null,
            previous: null,
            author: false,
            count: 0


        }
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

                posts: responseData.results,
                next: responseData.next,
                previous: responseData.previous,
                author: responseData.author,
                count: responseData.count

            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }

    handleNewPost = (postItemData) => {

        // console.log(postItemData)
        let currentPosts = this.state.posts
        currentPosts.unshift(postItemData) // unshift is used to prepend data as push appends the data
        this.setState({
            posts: currentPosts
        })

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
            postsListClass: "card",
            next: null,
            previous: null,
            author: false,
            count: 0

        })
    }

    render() {
        const csrfToken = cookie.load('csrftoken')
        const {posts} = this.state
        const {postsListClass} = this.state
        const {author} = this.state
        return (
            <div>
                <h1> Hello World! </h1>
                <Link maintainScrollPosiiton={false} to={{
                    pathname: '/posts/create/',
                    state: {fromDashboard: false},


                }}>Create Post</Link>
                <button onClick={this.togglePostListClass}>Toggle Class</button>
                {posts.length > 0 ? posts.map((postItem, index) => {

                    return (
                        <PostInline post={postItem} elClass={postsListClass}/> //here we pass props
                    )


                }) : <p>No Posts Found</p>}
                {/*thi is just to make sure that there is a csrf token*/}


            </div>

        )
    }
}

export default Posts
