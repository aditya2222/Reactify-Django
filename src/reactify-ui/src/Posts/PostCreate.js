import React, {Component} from 'react'
import cookie from "react-cookies";
import 'whatwg-fetch'
import moment from 'moment'

class PostCreate extends Component {

	constructor(props) {
		super(props)
		this.state = {
			draft: false,
			title: null,
			content: null,
			publish: null,
		}

	}

	// Post Create

	createPost = (data) => {
		const csrfToken = cookie.load('csrftoken')
		const endpoint = '/api/posts/'  // On a live server we will use a live url such as https://www.adiflashinfotech.com/api/posts
		let thisComp = this
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
					console.log(responseData) //this is actually the posts content
					if (thisComp.props.newPostItemCreated) {
						thisComp.props.newPostItemCreated(responseData)
					}
					thisComp.clearForm()
				}).catch(function (error) {
					console.log('error', error)
					alert("An error occured. Please Try Again Later!")
				})


		}

	}

	//Form Handling

	handleSubmit = (event) => {
		//Preventing the default submit action of the form such as refresh on button click so that we can implement our own methods
		event.preventDefault()
		// console.log(this.state)
		let data = this.state
		this.createPost(data)
		// console.log(data)


	}

	handleInputChange = (event) => {
		event.preventDefault()
		console.log(event.target.name, event.target.value)
		let key = event.target.name
		let value = event.target.value
		if (key == 'title') {
			if (value.length > 120) {
				alert("this title is tooo long!")
			}
		}
		this.setState({
			// block [] specifies key in the key-value pair
			[key]: value,
		})
	}
	
	handleDraftChange = (event) => {
	event.preventDefault()
	this.setState({
	
		draft: !this.state.draft
	
	})
	
	}

	clearForm = (event) => {
		if (event) {
			event.preventDefault()
		}
		this.postCreateForm.reset()

	}

	// We can clear form refrends too by using something like this.refName.current = ''


	componentDidMount() {
		this.setState({
			draft: false,
			title: null,
			content: null,
			publish: moment(new Date()).format('YYYY-MM-DD'),
		})
		this.postTitleRef.focus()


	}

	render() {
		const {publish} = this.state
		return (
			<form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}>

			<div className='form-group'>
			<label for='title'>Post Title</label>
			<input type='text' ref={(el) => this.postTitleRef = el} id='title' name='title'
			className='form-control' placeholder='Blog Post Title'
			onChange={this.handleInputChange} required='required'/>

			</div>
			<div className='form-group'>
			<label for='content'>Content</label>
			<textarea id='content' name='content' className='form-control' placeholder='Post Content'
			onChange={this.handleInputChange} required='required'/>
			</div>
			<div className='form-group'>
			<label for='draft'>Draft</label>
			<input type='checkbox' id='draft' checked={this.state.draft}  name='draft' className='mr-2' onChange={this.handleDraftChange}/>
			<button onClick={this.handleDraftChange}>Toggle Draft</button>
			</div>
			<div className='form-group'>
			<label for='publish'>Publish Date</label>
			<input type='date' id='publish' name='publish' className='form-control'
			onChange={this.handleInputChange} value={publish} required='required'/>

			</div>
			<button className='btn btn-primary'>Save</button>
			<button className='btn btn-secondary' onClick={this.clearForm}>Cancel</button>

			</form>

		)
	}
}

export default PostCreate
