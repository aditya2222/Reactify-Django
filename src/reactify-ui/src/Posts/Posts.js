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

	loadMorePosts = () => {
		const {next}  = this.state.next

		if(next !== null || next !== undefined){

			this.loadPosts(next)	
		}
		this.loadPosts()	



	}


	loadPosts = (nextEndpoint) => {
		let endpoint = '/api/posts'
		if(nextEndpoint!== undefined){

			endpoint = nextEndpoint 

		}

		let thisComp = this
		let lookupOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'

			}
		}
		const csrfToken = cookie.load('csrftoken')
		if (csrfToken !== undefined) {
			lookupOptions['credentials'] = 'include'  
			lookupOptions['headers']['X-CSRFToken'] = csrfToken
		}



		fetch(endpoint, lookupOptions)
			.then(function (response) {
				return response.json()
			}).then(function (responseData) {
				let currentPosts = thisComp.state.posts
				let newPosts = 	currentPosts.concat(responseData.results) 

				thisComp.setState({

					posts: newPosts ,
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
		const {posts} = this.state
		const {postsListClass} = this.state
		const {author} = this.state
		const {next} = this.state
		return (
			<div>
			<h1> Hello World! </h1>
			{author === true ? <Link className='mr-2' maintainScrollPosiiton={false} to={{
				pathname: '/posts/create/',
					state: {fromDashboard: false},


			}}>Create Post</Link>:""}
			<button onClick={this.togglePostListClass}>Toggle Class</button>
			{posts.length > 0 ? posts.map((postItem, index) => {

				return (
					<PostInline post={postItem} elClass={postsListClass}/> //here we pass props
				)


			}) : <p>No Posts Found</p>}
			{/*thi is just to make sure that there is a csrf token*/}
			{next !== null ? <button onClick={this.loadMorePosts}>Load More</button>:''}

			</div>

		)
	}
}

export default Posts
