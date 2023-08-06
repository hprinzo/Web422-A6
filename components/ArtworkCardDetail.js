import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from "../store";
import { addToFavourites, removeFromFavourites } from '../lib/userData';

const ArtworkCardDetail = ({ objectID }) => 
{
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  
  useEffect(() => 
  {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);
  
  
  if (error) 
    return <Error statusCode={errorStatusCode || 500} />;
  
  if (!data) 
    return null;
  

  const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;
  const favouritesClicked = async () => 
  {
    if (showAdded) 
    {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } 
    else 
    {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  return (
    <Card>
      {primaryImage && (
        <Card.Img
          variant="top"
          src={primaryImage}
          alt="Artwork"
        />
      )}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'}
          <br />
          <strong>Classification:</strong> {classification || 'N/A'}
          <br />
          <strong>Medium:</strong> {medium || 'N/A'}
          <br /><br />
          {artistDisplayName && (
            <span>
              <strong>Artist:</strong>{' '}
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
              <br />
            </span>
          )}
          <strong>Credit Line:</strong> {creditLine || 'N/A'}
          <br />
          <strong>Dimensions:</strong> {dimensions || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">View Artwork {objectID}</Button>
        </Link>
        
        <br/> <br/>
        <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
          {
            showAdded ? '+ Favourite (added)' : '+ Favourite'
          }
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;