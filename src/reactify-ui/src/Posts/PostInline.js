import React, { Component } from 'react'

class PostInline extends Component {
  render () {
  	const {Post} = this.props
	const {elClass} = this.props
	const showContent = elClass === 'card' ? 'd-block':'d-none'
    return (

      <div>
	    {Post !== undefined ? <div className={elClass}>
        <h1> Post's {Post.title} </h1>
	    <p className={showContent}>{Post.content}</p>
		    </div>:""}

      </div>
    )
  }
}

export default PostInline
