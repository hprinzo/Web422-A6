import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';

const AdvancedSearch = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


    const submitForm = async (data) => 
    {
        let queryString = 'searchBy=true';
    
        if (data.geoLocation) 
        {
          queryString += `&geoLocation=${data.geoLocation}`;
        }
    
        if (data.medium) 
        {
          queryString += `&medium=${data.medium}`;
        }
    
        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`;
    
        setSearchHistory((current) => [...current, queryString]);
        await addToHistory(queryString);
    
        router.push(`/artwork?${queryString}`);
    };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
            <Col md={6}>
                <Form.Group controlId="q">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control {...register('q', { required: true })} type="text" className={errors.q ? 'is-invalid' : ''} />
                    {errors.q && <Form.Text className="invalid-feedback">This field is required.</Form.Text>}
                </Form.Group>
            </Col>    
        </Row>

        <Row>        
            <Col md={4}>
                <Form.Group controlId="searchBy">
                    <Form.Label>Search By</Form.Label>
                        <Form.Select {...register('searchBy')} defaultValue="title">
                                <option value="title">Title</option>
                                <option value="tags">Tags</option>
                                <option value="artistOrCulture">Artist or Culture</option>
                        </Form.Select>
                </Form.Group>
            </Col>

            <Col md={4}>
                <Form.Group controlId="geoLocation">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control {...register('geoLocation')} type="text" />
                </Form.Group>
            </Col>
                
            <Col md={4}>    
                <Form.Group controlId="medium">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control {...register('medium')} type="text" />
                </Form.Group>
            </Col>
        </Row>
        
        <br/>

        <Row>
            <Col>    
                <Form.Group controlId="isOnView">
                    <Form.Check {...register('isOnView')} label="Is on view" type="checkbox" />
                </Form.Group>
                <Form.Group controlId="isHighlight">
                    <Form.Check {...register('isHighlight')} label="Is highlight" type="checkbox" />
                </Form.Group>
            </Col>
        </Row>

        <br/>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default AdvancedSearch;
