import React from 'react';
import Modal from 'react-modal';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import '../DateTime/DateTime.css';
var DateTime = require('react-datetime');
var axios = require('axios');
var moment = require('moment');

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

class AddChallenge extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
			name: '',
			description: '',
			image: '',
			icon: '',
			tag: '',
			status: '',
			start_time: '',
			end_time: '',
			require_user: '',
			location: '',
			point: '',
			creator: ''
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.onChange = this.onChange.bind(this);
    this.chooseStartTime = this.chooseStartTime.bind(this);
    this.chooseEndTime = this.chooseEndTime.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
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

	chooseStartTime(evt) {
		var time = new Date(evt._d.valueOf());
		time = moment(time).format('YYYY-MM-DD hh:mm:ss');
		this.setState({ start_time: time });
	}

	chooseEndTime(evt) {
		var time = new Date(evt._d.valueOf());
		time = moment(time).format('YYYY-MM-DD hh:mm:ss');
		this.setState({ end_time: time });
	}

	handleClick() {
		if (
			this.state.name.length > 0 &&
			this.state.description.length > 0 &&
			this.state.image.length > 0 &&
			this.state.tag.length > 0 &&
			this.state.status.length > 0 &&
			this.state.start_time.length > 0 &&
			this.state.end_time.length > 0 &&
			this.state.require_user.length > 0 &&
			this.state.location.length > 0 &&
			this.state.point.length > 0 &&
			this.state.creator.length > 0 &&
			this.state.icon.length > 0
		) {
			axios.defaults.headers.common['Authorization'] =
				'Bearer ' +
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWluaHRoYW5oIiwiaWF0IjoxNTE2NDMwNTk3fQ.1OvbqGr3-K0Ax4gnzjz3t38Y__MmW1to8ICQ33u4XEM';
			let data = JSON.stringify({
				name: this.state.name,
				description: this.state.description,
				image: this.state.image,
				icon: this.state.icon,
				tag: this.state.tag,
				status: this.state.status,
				start_time: this.state.start_time,
				end_time: this.state.end_time,
				require_user: this.state.require_user,
				location: this.state.location,
				point_reward: this.state.point_reward,
				creator: this.state.creator
			});
			axios
				.post('http://159.89.206.221:4000/challenges', data, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(function(response) {
					console.log(response);
					if (response.data.length > 0) {
						alert('Add New Challenge Success!');
					}
				})
				.catch(function(error) {
					alert(error);
				});
		}
	}

	render() {
		return (
			<div>
				<Button color="primary" onClick={this.openModal}>
					Add New Challenge
				</Button>{' '}
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Add New Challenge"
				>
					<h1 ref={(subtitle) => (this.subtitle = subtitle)}>Add New Challenge</h1>
					<div>
						<Input id="name" placeholder="Challenge Name" onChange={this.onChange} />
						<Input id="description" placeholder="Description" onChange={this.onChange} />
						<Input id="image" placeholder="Image" onChange={this.onChange} />
						<Input id="icon" placeholder="Icon" onChange={this.onChange} />
						<Input id="tag" placeholder="Tag" onChange={this.onChange} />
						<Input id="status" placeholder="Status" onChange={this.onChange} />
						<DateTime
							defaultValue="Start Time"
							inputProps={{ id: 'start_time' }}
							dateFormat={'YYYY-MM-DD'}
							timeFormat={'hh:mm:ss'}
							onChange={this.chooseStartTime}
						/>
						<DateTime
							defaultValue="End Time"
							inputProps={{ id: 'end_time' }}
							dateFormat={'YYYY-MM-DD'}
							timeFormat={'hh:mm:ss'}
							onChange={this.chooseEndTime}
						/>
						{/* <Input id="start_time" placeholder="Start Time" onChange={this.onChange} /> */}
						{/* <Input id="end_time" placeholder="End Time" onChange={this.onChange} /> */}
						<Input id="require_user" placeholder="Require User" onChange={this.onChange} />
						<Input id="location" placeholder="Location" onChange={this.onChange} />
						<Input id="point" placeholder="Point Reward" onChange={this.onChange} />
						<Input id="creator" placeholder="Creator" onChange={this.onChange} />
					</div>{' '}
					<br />
					<Button color="primary" onClick={this.handleClick}>
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
	}
}

export default AddChallenge;
