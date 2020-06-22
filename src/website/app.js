/* Global Variables */
// API KEY FOR OpenWeatherMap.com
const apiKey = '76f1aeec7d3a59e992ee01cc42c88559';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// API Endpoint on the server side to get and update the data
const apiEndpoint = '/data';

document.addEventListener('DOMContentLoaded', () => {
	// generate button
	const generateButton = document.getElementById('generate');

	// entry elements

	// date of the new entry
	const dateElement = document.getElementById('date');
	// temperature element
	const tempElement = document.getElementById('temp');
	// content of the user feelings
	const contentElement = document.getElementById('content');

	generateButton.addEventListener('click', generateNewEntry);

	async function generateNewEntry() {
		try {
			// userInput
			const { zipCode, userResponse } = getUserInput();
			// validate the inputs
			if (!zipCode || !userResponse) {
				console.warn('please provide correct inputs');
				return;
			}
			// request data from the openWeather and returns it
			const dataFromWeatherAPI = await getWeatherData(zipCode, userResponse);

			// send the data to the server api endpoint
			const dataToServer = await postDataToServer(dataFromWeatherAPI);

			// get the data from the server api endpoint
			const dataFromServer = await getDataFromServer();

			// update the ui html elements
			updateUI(dataFromServer);
		} catch (e) {
			console.log(e);
		}
	}

	function updateUI({ date, userResponse, temperature }) {
		dateElement.innerHTML = `<span>Date: </span> ${date}`;
		tempElement.innerHTML = `<span>Temp: </span> ${temperature}` ;
		contentElement.innerHTML = `<span>Feelings: </span> ${userResponse}`;
	}
	function getUserInput() {
		const zipCode = document.getElementById('zip').value;
		const userResponse = document.getElementById('feelings').value;
		return {
			zipCode,
			userResponse,
		};
	}
});

function getCurrentDate() {
	const d = new Date();
	return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

async function getWeatherData(zipCode, userResponse) {
	// the url to request
	let url = baseURL + zipCode + `&appid=${apiKey}`;
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return {
				date: getCurrentDate(),
				temperature: data.main.temp,
				userResponse,
			};
		}
	} catch (e) {
		throw e;
	}
}
async function getDataFromServer() {
	try {
		const serverResponse = await fetch(apiEndpoint);
		return await serverResponse.json();
	} catch (e) {
		throw e;
	}
}
async function postDataToServer(data) {
	try {
		const response = await fetch(apiEndpoint, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	} catch (e) {
		throw e;
	}
}
