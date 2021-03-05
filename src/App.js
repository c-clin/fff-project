import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BookItem from './components/BookItem';
import Loader from './components/Loader';

const QUANTITY = 23;
function App() {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);
	const contentRef = useRef();

	useEffect(() => {
		const fetchApi = async () => {
			setLoading(true);
			const res = await axios.get(
				`https://fakerapi.it/api/v1/books?_quantity=${QUANTITY}`
			);

			if (res.data.code === 200) {
				setBooks((oldBooks) => [...oldBooks, ...res.data.data]);
				if (error) setError(null);
			} else {
				setError('Oops! Please try again.');
			}
			setLoading(false);
		};

		fetchApi();
	}, [page, error]);

	useEffect(() => {
		const filterBooks = () => {
			const newBooks = books.filter(
				(book) =>
					book.title
						.replace(/['.,/#!$%^&*;:{}=\-_`~()]/g, '')
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					book.author.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredBooks(newBooks);
		};

		filterBooks();
	}, [searchQuery, books]);

	const renderBooks = () => {
		if (error) {
			return <p>{error}</p>;
		}

		if (filteredBooks.length) {
			return filteredBooks.map((book, i) => <BookItem key={i} book={book} />);
		}
	};

	const renderButtons = () => {
		return (
			<div className="button-container">
				<button disabled={error} onClick={() => setPage(page + 1)}>
					add books
				</button>
				<button
					disabled={error}
					onClick={() =>
						contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
					}
				>
					go back up
				</button>
			</div>
		);
	};

	return (
		<div className="App">
			<div className="App__container">
				<h1 className="primary-header">booooks search</h1>
				<div className="App__search">
					<input
						placeholder="filter by.."
						className="App__search--input"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="content" ref={contentRef}>
					<div className="books-container">{renderBooks()}</div>

					{loading && <Loader />}

					{!loading && !error && filteredBooks.length === 0 && (
						<p>There are no books to show!</p>
					)}
				</div>

				{renderButtons()}
			</div>
		</div>
	);
}

export default App;
