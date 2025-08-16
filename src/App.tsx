import { TimerIcon } from 'lucide-react';
import { Heading } from './components/Heading';

import './styles/global.css';
import './styles/theme.css';

export function App() {
  return (
    <>
      <Heading>
        Olá mundo
        <button>
          <TimerIcon />
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
        debitis voluptatibus quae iure ipsum harum ipsam. Minima animi libero,
        aut, explicabo, cumque iste sit consequuntur ratione nam est ipsa cum.
      </p>
    </>
  );
}
