import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import {Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {
  Header, Spinner,
  Button, InverseButton, IconButton,
  Card, CardBody,
  Drawer
} from '@cd-workspace/ui';
import { fetchTodos } from '../../redux/todo/todo-actions';
import { selectTodos, selectIsFetching } from "../../redux/todo/todo-selectors";

const Details = lazy(() => import('../details/details'));

const NoTodoWrapper = styled.div`
  --card-bg-color: #e0a2ca;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem;

  div#button-wrapper {
    margin: 1rem;
  }
`;

const FormWrapper = styled.form<{children: React.ReactNode[]}>`
 margin: 2rem;
 display: grid;
 grid-gap: 2rem;

 label {
   margin-right: 1rem;
 }
 div {
     display: grid;
    grid-template-columns: 1fr 3fr;
 }
`;

const DrawerTitle = styled.div<{children: React.ReactNode}>`
  min-height: 2rem;
  border-bottom: 1px solid grey;
  text-align: center;
`;

const CloseButton = styled.div`
  --icon-btn-size: 1rem;
  position: absolute;
  top: 0;
  right: 0;
   padding: 1rem;
`;

const drawerContent = (closeDrawer) => {
    return (
       <>
         <DrawerTitle>
           <div>
             <h2>Add a new Todo</h2>
             <CloseButton><IconButton onClick={closeDrawer}>X</IconButton></CloseButton>
           </div>
         </DrawerTitle>
         <FormWrapper>
           <div>
             <label htmlFor="firstname">First name:</label>
             <input type="text" name="firstname" id="firstname" />
           </div>
           <div>
             <label htmlFor="lastname">Last name:</label>
             <input type="text" name="lastname" id="lastname" />
           </div>
           <div>
             <label htmlFor="age">Age:</label>
             <input type="text" name="age" id="age" />
           </div>
           <div>
             <label htmlFor="address">Address:</label>
             <input type="text" name="address" id="address" />
           </div>
         </FormWrapper>
       </>
    );
}

export const Home = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const isFetching = useSelector(selectIsFetching);
    const todos = useSelector(selectTodos);

    const [isOpened, setIsOpened] = useState(false);

    const closeDrawer = () => {
      setIsOpened(false);
    }
    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const renderContent = () => {
      return <>
        {
          todos.length > 0 ?
            <>
              <h3>This is Home</h3>
              <div>To go to Details click <Link to={`${url}details/111`}>Components</Link></div>
            </> :
            <NoTodoWrapper>
             <>
               <Card ariaLabelledby='no-todo' ariaDescribedby='no-todo-message'>
                 <CardBody>
                   <div>
                     <h2 id='no-todo'>Looks like you have no Todo's yet.</h2>
                     <p id='no-todo-message'>Let's start your journey by adding you first todo.</p>
                     <InverseButton ariaLabel='Add Todo Button in Card' ariaDescribedby='no-todo-message'>Add Todo</InverseButton>
                   </div>
                 </CardBody>
               </Card>
               <div id='button-wrapper'>
                 <Button ariaLabel='Add New Todo' ariaDescribedby='no-todo-message' onClick={() => setIsOpened(true)}>
                   Add New Todo
                 </Button>
               </div>
             </>
            </NoTodoWrapper>
        }
        {
          isOpened ? <Drawer opened={isOpened} slide='right' onClose={closeDrawer}>{drawerContent(closeDrawer)}</Drawer> : null
        }
      </>;
    };

    return (
        <>
            <Header />
            <Switch>
                <Route exact path={path}>
                  {
                    isFetching ? <Spinner /> : renderContent()
                  }
                </Route>
                <Route path={`${path}details/:id`}>
                    <Details />
                </Route>
            </Switch>
        </>
    )
};

export default Home;
