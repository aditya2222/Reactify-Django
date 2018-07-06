import React, {Component} from 'react'
import 	{Link} from 'react-router-dom'



class PostDetail extends Component{

	constructor(props){

		super(props)
		this.state = {
			slug:null,
			post:null,
			doneLoading:false,



		}


	}


	loadPost = (slug) => {
		const endpoint = `/api/posts/${slug}/` // On a live server we will use a live url such as https://www.adiflashinfotech.com/api/posts
		let thisComp = this
		let lookupOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'

			}
		}

		fetch(endpoint, lookupOptions)
			.then(function (response) {
				if(response.status == 404){
				console.log("Not Found")	
				}
				return response.json()
			}).then(function (responseData) {
				console.log(responseData)
				if(responseData.detail){
								
				thisComp.setState({

					doneLoading: true,
					post: null // It is a key-value pair where posts is the key and responseData is the value

				})
				
				
				}
				else{
				
				thisComp.setState({

					doneLoading: true,
					post: responseData // It is a key-value pair where posts is the key and responseData is the value

				})
				
				}

			}).catch(function (error) {
				console.log('error', error)
			})
	}


	componentDidMount(){

		this.setState({

			slug:null,
			post:null,


		})

		if(this.props.match){

			const {slug} = this.props.match.params
			this.setState({

				slug:slug,
				doneLoading:false,

			})
			this.loadPost(slug)

		}


	}
	render(){
		const {doneLoading} = this.state
		const {post} = this.state

		return (
			<p>{doneLoading === true ? <div>

				{post === null ? "Not Found":
					<div>
					<h1>{post.title}</h1>{post.slug}

					<p id="lead"><Link maintainScrollPosiiton={false} to={{
						pathname: '/posts'	,
							state: {fromDashboard: false},


					}}>Posts</Link></p>
					</div>


				}	




				</div>:"Loading ..."}</p>


		)


	}





}

export default PostDetail
