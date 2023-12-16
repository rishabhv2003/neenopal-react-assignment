import React, { useEffect, useState } from 'react';
import './Box.css';
import { Persons } from './../Data';
// icons
import { Mail, Phone, Globe, Trash, Heart, Edit3 } from 'react-feather';

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

	const handleDeleteClick = (personId) => {
		const updatedPersons = persons.filter((person) => person.id !== personId);
		setPersons(updatedPersons);
	};

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

	const handleSaveEdit = () => {
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
	};

	return (
		<div className="box-container">
			{persons.map((person) => (
				<div key={person.id} className="person-box">
					<div className="upper-half">
						<img src={person.image} alt={person.name} />
					</div>
					<div className="lower-half">
						<h3>{person.name}</h3>
						<p>
							<Mail /> {person.email}
						</p>
						<p>
							<Phone /> {person.telephone}
						</p>
						<p>
							<Globe /> {person.website}
						</p>
						<div className="horizontal-tabs">
							<button
								className={`like-button ${isPersonLiked(person.id) ? 'liked' : ''}`}
								onClick={() => handleLikeClick(person.id)}
							>
								<Heart />
							</button>
							<button className="edit-button" onClick={() => handleEditClick(person)}>
								<Edit3 />
							</button>
							<button className="delete-button" onClick={() => handleDeleteClick(person.id)}>
								<Trash />
							</button>
						</div>
					</div>
				</div>
			))}

			{isEditMenuOpen && (
				<div className="edit-menu">
					<h3>Edit Person</h3>
					<label>
						Name:
						<input
							type="text"
							value={editedDetails.name}
							onChange={(e) => handleEditInputChange('name', e.target.value)}
						/>
					</label>
					<label>
						Email:
						<input
							type="text"
							value={editedDetails.email}
							onChange={(e) => handleEditInputChange('email', e.target.value)}
						/>
					</label>
					<label>
						Telephone:
						<input
							type="text"
							value={editedDetails.telephone}
							onChange={(e) => handleEditInputChange('telephone', e.target.value)}
						/>
					</label>
					<label>
						Website:
						<input
							type="text"
							value={editedDetails.website}
							onChange={(e) => handleEditInputChange('website', e.target.value)}
						/>
					</label>
					<button onClick={handleSaveEdit}>Save</button>
				</div>
			)}
		</div>
	);
}

export default Box;
