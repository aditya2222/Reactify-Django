import React, { Component } from 'react'
import 	{Link} from 'react-router-dom'

class PostInline extends Component {
	render () {
		const {post} = this.props
		const {elClass} = this.props
		const showContent = elClass === 'card' ? 'd-block':'d-none'
		return (

			<div>
			{post !== undefined ? <div className={elClass}>
				{/* This type of hyperlink refrences are used in react but it starts caching so we may prefer to user router instead of this approach */}
				{/*	<h1> <a href={`/posts/${post.slug}`}> {Post.title} </a> </h1> */}
				<h1><Link maintainScrollPosiiton={false} to={{
					pathname: `/posts/${post.slug}`	,
						state: {fromDashboard: false},


				}}>{post.title}</Link></h1>
				<p className={showContent}>{post.content}</p>
				</div>:""}

			</div>
		)
	}
}

export default PostInline
