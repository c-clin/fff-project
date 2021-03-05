import React from 'react';

const BookItem = ({ book }) => {
	const { title, author, image } = book;
	return (
		<div className="BookItem">
			<h1>{title}</h1>
			<h3>By: {author}</h3>
			<img src={image} alt={`${title} by ${author}`} />
		</div>
	);
};

export default BookItem;
