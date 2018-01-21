import React from 'react';
import Modal from 'react-modal';
import { Button, Table, CardImg, Input } from 'reactstrap';
var axios = require('axios');

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class ListChallenges extends React.Component {
	constructor() {
		super();
		this.state = {
			modalIsOpen: false,
			curChallengeId: '',
			image: '',
			name: '',
			description: '',
			hidden_content: '',
			data: []
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	openModal(id) {
		this.setState({ modalIsOpen: true, curChallengeId: id });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	onChange(evt) {
		this.setState({ [evt.target.id]: evt.target.value });
	}

	handleAdd() {
		if (
			this.state.curChallengeId.toString().length > 0 &&
			this.state.image.length > 0 &&
			this.state.name.length > 0 &&
			this.state.description.length > 0 &&
			this.state.hidden_content.length > 0
		) {
			axios.defaults.headers.common['Authorization'] =
				'Bearer ' +
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwOTM4MTAyMTYwIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJmdWxsbmFtZSI6IkzDqiBNaW5oIFRow6BuaCIsInNleCI6MSwicG9pbnQiOjEwLCJvbmVTaWduYWwiOiIiLCJpYXQiOjE1MTY0ODc5Nzd9.Ml5KCKltz9rRSxhhmM6Jhb8b42LQt9typCMvBGURC4A';
			let data = JSON.stringify({
				image: this.state.image,
				name: this.state.name,
				description: this.state.description,
				hidden_content: this.state.hidden_content,
			});
			axios
				.post('http://159.89.206.221:4000/challenges/'+ this.state.curChallengeId +'/rewards', data, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					console.log(response);
					if (response.data.length > 0) {
						alert('Add New Reward Success!');
					}
				})
				.catch(function(error) {
					alert(error);
				});
		}
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] =
			'Bearer ' +
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIwOTM4MTAyMTYwIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJmdWxsbmFtZSI6IkzDqiBNaW5oIFRow6BuaCIsInNleCI6MSwicG9pbnQiOjEwLCJvbmVTaWduYWwiOiIiLCJpYXQiOjE1MTY0ODc5Nzd9.Ml5KCKltz9rRSxhhmM6Jhb8b42LQt9typCMvBGURC4A';
		axios
			.get('http://159.89.206.221:4000/challenges', {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				this.setState({ data: response.data.reverse() });
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		if (this.state.data.length > 0) {
			return (
				<div>
					<Table>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Description</th>
								<th>Image</th>
								<th>Icon</th>
								<th>Tag</th>
								<th>Status</th>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Require User</th>
								<th>Location</th>
								<th>Point Reward</th>
								<th>Creator</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((data) => {
								return (
									<tr>
										<td>{data.id}</td>
										<td>{data.name}</td>
										<td>{data.description}</td>
										<td>
											<CardImg top width="100%" src={data.image} alt="Challenge Image" />
										</td>
										<td>
											<CardImg top width="100%" src={data.icon} alt="Challeng Icon" />
										</td>
										<td>{data.tag}</td>
										<td>{data.status}</td>
										<td>{data.start_time}</td>
										<td>{data.end_time}</td>
										<td>{data.require_user}</td>
										<td>{data.location}</td>
										<td>{data.point_reward}</td>
										<td>{data.creator}</td>
										<td>
											<Button color="primary" onClick={()=>this.openModal(data.id)} >Add Reward</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Add Reward"
					>
						<h1 ref={(subtitle) => (this.subtitle = subtitle)}>Add New Reward</h1>
						<div>
							<Input id="challenge_id" placeholder="Challenge ID" value={this.state.curChallengeId} disabled/>
							<Input id="image" placeholder="Image" onChange={this.onChange}/>
							<Input id="name" placeholder="Name" onChange={this.onChange}/>
							<Input id="description" placeholder="Description" onChange={this.onChange}/>
							<Input id="hidden_content" placeholder="Hidden Content" onChange={this.onChange}/>
						</div>{' '}
						<br />
						<Button color="primary" onClick={this.handleAdd}>
							Add
						</Button>
						{'  '}
						<Button color="danger" onClick={this.closeModal}>
							Close
						</Button>{' '}
						<br /> <br />
					</Modal>
				</div>
			);
		} else return <div />;
	}
}

export default ListChallenges;
