import { Button } from 'components/Button/Button';
import { render } from '@testing-library/react';

test('renders the button component', () => {
	render(<Button>Tekst</Button>);
});
