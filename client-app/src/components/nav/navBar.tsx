import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  openCreateForm: () => void;
}

const navBar: React.FC<IProps> = ({ openCreateForm }) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header>
        <img src="/assets/logo.png" alt="logo" />
        Reactivities
      </Menu.Item>
      <Menu.Item name="Activities" />
      <Menu.Item>
        <Button onClick={openCreateForm} positive content="Create Activity" />
      </Menu.Item>
    </Container>
  </Menu>
);

export default navBar;
