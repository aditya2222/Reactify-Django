import React, {Component} from 'react'

class PostCreate extends Component {

    //Form Handling

    handleSubmit = (event) => {
        //Preventing the default submit action of the form such as refresh on button click so that we can implement our own methods
        event.preventDefault()
        console.log(this.state)
        let data = this.state
        if (data['draft'] === 'on') {
            data['draft'] = true
        } else {
            data['draft'] = false

        }
        console.log(data)


    }

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event.target.name, event.target.value)
        let key = event.target.key
        let value  = event.target.value
        this.setState({
            // block [] specifies key in the key-value pair
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div className='form-group'>
                    <label for='title'>Post Title</label>
                    <input type='text' id='title' name='title' className='form-control' placeholder='Blog Post Title'
                           onChange={this.handleInputChange} required='required'/>

                </div>
                <div className='form-group'>
                    <label for='content'>Content</label>
                    <textarea id='content' name='content' className='form-control' placeholder='Post Content'
                              onChange={this.handleInputChange} required='required'/>
                </div>
                <div className='form-group'>
                    <input type='checkbox' id='draft' name='draft' className='mr-2' onChange={this.handleInputChange}/>
                    <label for='draft'>Draft</label>

                </div>
                <div className='form-group'>
                    <label for='publish'>Publish Date</label>
                    <input type='date' id='publish' name='publish' className='form-control'
                           onChange={this.handleInputChange} required='required'/>

                </div>
                <button className='btn btn-primary'>Save</button>

            </form>

        )
    }
}

export default PostCreate
