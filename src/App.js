import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get("/repositories").then((response) => setRepositories(response.data));
	}, []);

	async function handleAddRepository() {
		const dummyData = {
			title: `Repositorio ${repositories.length + 1}`,
			url: "https://github.com/nedois/desafio-conceitos-reactjs",
			techs: ["Nodejs", "ReactJs", "Express"],
		};

		const { data: repository } = await api.post("/repositories", dummyData);

		setRepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`);

		const repositoriesFiltered = repositories.filter(
			(repository) => repository.id !== id
		);

		setRepositories(repositoriesFiltered);
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map(({ id, title }) => (
					<li key={id}>
						{title}
						<button onClick={() => handleRemoveRepository(id)}>Remover</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
