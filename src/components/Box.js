import React from 'react';
import './Box.css';
import { useState } from 'react';
// icons
import { Mail, Phone, Globe, Trash, Heart, Edit3 } from 'react-feather';

function Box(props) {
	const { persons } = props;
	// handling the likes
	const [likedPersons, setLikedPersons] = useState([]);
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
	
	// Edit button
	

	if (!persons || persons.length === 0) {
		return <p>No persons to display</p>;
	}

	return (
		<div className="box-container">
			{persons.map((person) => (
				<div key={person.id} className="person-box">
					<div className="upper-half">
						<img src={person.image} alt={person.name} />
					</div>
					<div className="lower-half">
						<h2>{person.name}</h2>
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
							<button className={`like-button ${isPersonLiked(person.id) ? 'liked' : ''}`}
								onClick={() => handleLikeClick(person.id)} > <Heart />
							</button>
							<button className="edit-button"> <Edit3 /> </button>
							<button className="delete-button"> <Trash /> </button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Box;
