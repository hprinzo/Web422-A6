import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';
import { useRouter } from 'next/router';

export default function ArtworkById() {
  const { objectID } = useRouter().query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}
