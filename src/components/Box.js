import React, { useEffect, useState } from 'react';
import './Box.css';
import Persons  from './../Data';
// icons
import Mail from '../svg/Mail';
import Phone from '../svg/Phone';
import Globe from '../svg/Globe';
import Trash from '../svg/Trash';
import Heart from '../svg/Heart';
import HeartFilled from '../svg/HeartFilled';
import Edit from '../svg/Edit';
function Box() {
	const [persons, setPersons] = useState([]);
	const [id, setId] = useState(0);
	const [likedPersons, setLikedPersons] = useState([]);
	const [isEditMenuOpen, setEditMenuOpen] = useState(false);
	const [editedDetails, setEditedDetails] = useState({
		name: '',
		email: '',
		telephone: '',
		website: '',
	});
	useEffect(() => {
		setPersons(Persons);
	}, []);

	// start like button
	const handleLikeClick = (personId) => {
		setLikedPersons((prevLikedPersons) => {
			if (prevLikedPersons.includes(personId)) {
				return prevLikedPersons.filter((id) => id !== personId);
			} else {
				return [...prevLikedPersons, personId];
			}
		});
	};
	const isPersonLiked = (personId) => likedPersons.includes(personId);
	// end like button

	// start delete button
	const handleDeleteClick = (personId) => {
		const updatedPersons = persons.filter((person) => person.id !== personId);
		setPersons(updatedPersons);
	};
	// end delete button

	// start edit button
	const handleEditClick = (person) => {
		setEditMenuOpen(true);
		setId(person.id);
		setEditedDetails({
			name: person.name,
			email: person.email,
			telephone: person.telephone,
			website: person.website,
		});
	};

	const handleEditInputChange = (field, value) => {
		setEditedDetails((prevDetails) => ({
			...prevDetails,
			[field]: value,
		}));
	};
	// end edit button

	// start save button
	function isValid() {
		if (editedDetails.email && editedDetails.name && editedDetails.telephone && editedDetails.website) {
			return true;
		} return false;
	}
	const handleSaveEdit = (e) => {
		e.preventDefault();
		if (isValid()) {
			const updatedPersons = persons.map((person) => {
				if (person.id === id) {
					return {
						...person,
						name: editedDetails.name,
						email: editedDetails.email,
						telephone: editedDetails.telephone,
						website: editedDetails.website,
					};
				}
				return person;
			});
			setPersons(updatedPersons);
			setEditMenuOpen(false);
		}
	};
	// end edit button

	// start cancel edit button
	const handleCancelEdit = () => {
		setEditMenuOpen(false);
	};
	// end cancel edit button
	return (
		<div className="box-container">
			{persons.map((person) => (
				<div key={person.id} className="person-box">
					<div className="upper-half">
						<img src={person.image} alt={"Avatar"} />
					</div>
					<div className="lower-half">
						<h3 className='person-name'>{person.name}</h3>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<i>
								<Mail />
							</i>
							<p>
								{person.email}
							</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<i><Phone /></i>
							<p>
								{person.telephone}
							</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<i><Globe /></i>
							<p>
								{person.website}
							</p>
						</div>

					</div>
					<div className='lower-buttons'>
						<ul className="horizontal-tabs">
							<li className='list-buttons'>
								<button
									className={`like-button`}
									onClick={() => handleLikeClick(person.id)}
								>
									{isPersonLiked(person.id) ? <HeartFilled /> : <Heart />}
								</button>
							</li>
							<li className='list-buttons'>
								<button className="edit-button" onClick={() => handleEditClick(person)}>
									<Edit />
								</button>
							</li>
							<li className='list-buttons'>
								<button className="delete-button" onClick={() => handleDeleteClick(person.id)}>
									<Trash />
								</button>
							</li>
						</ul>
					</div>
				</div>
			))}
			{isEditMenuOpen && (
				<form>
					<div className="edit-menu">
						<div className='edit-menu-header'>
							<h3>Basic Modal</h3>
							<p onClick={handleCancelEdit} style={{ cursor: 'pointer', fontSize: '20px', color: '#555' }}>X</p>
						</div>
						<hr></hr>
						<label>
							<p>Name:</p>
							<input
								style={{ width: '60%' }}
								type="text"
								value={editedDetails.name}
								onChange={(e) => handleEditInputChange('name', e.target.value)}
							/>
							{editedDetails.name.length <= 0 ? <span className='err-msg'>Required</span> : ''}
						</label>
						<label>
							<p> Email:</p>
							<input
								type="text"
								value={editedDetails.email}
								onChange={(e) => handleEditInputChange('email', e.target.value)}
							/>
							{editedDetails.email.length <= 0 ? <span className='err-msg'>Required</span> : ''}
						</label>
						<label>
							<p> Phone:</p>
							<input
								type="text"
								value={editedDetails.telephone}
								onChange={(e) => handleEditInputChange('telephone', e.target.value)}
							/>
							{editedDetails.telephone.length <= 0 ? <span className='err-msg'>Required</span> : ''}
						</label>
						<label>
							<p>Website:</p>
							<input
								type="text"
								value={editedDetails.website}
								onChange={(e) => handleEditInputChange('website', e.target.value)}
							/>
							{editedDetails.website.length <= 0 ? <span className='err-msg'>Required</span> : ''}
						</label>
						<hr />
						<button type='submit' className='btn-save' onClick={handleSaveEdit}>OK</button>
						<button className='btn-cancel' onClick={handleCancelEdit}>Cancel</button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Box;
