import { getToken } from "./authenticate";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function makeAuthorizedRequest(url, method, body) 
{
  const token = getToken();
  const headers = 
  {
    "Content-Type": "application/json",
    Authorization: `JWT ${token}`,
  };

  const requestOptions = 
  {
    method,
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, requestOptions);
  if (response.status === 200) 
  {
    return response.json();
  } 
  else 
  {
    return [];
  }
}

export async function addToFavourites(id) 
{
  const url = `${apiUrl}/favourites/${id}`;
  return makeAuthorizedRequest(url, "PUT", {});
}

export async function removeFromFavourites(id) 
{
  const url = `${apiUrl}/favourites/${id}`;
  return makeAuthorizedRequest(url, "DELETE", {});
}

export async function getFavourites() 
{
  const url = `${apiUrl}/favourites`;
  return makeAuthorizedRequest(url, "GET");
}

export async function addToHistory(id) 
{
  const url = `${apiUrl}/history/${id}`;
  return makeAuthorizedRequest(url, "PUT", {});
}

export async function removeFromHistory(id) 
{
  const url = `${apiUrl}/history/${id}`;
  return makeAuthorizedRequest(url, "DELETE", {});
}

export async function getHistory() 
{
  const url = `${apiUrl}/history`;
  return makeAuthorizedRequest(url, "GET");
}
