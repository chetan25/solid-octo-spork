import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import {Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {
  Header, Spinner,
  Button, InverseButton, IconButton,
  Card, CardBody,
  Drawer, Input, Label
} from '@cd-workspace/ui';
import { fetchTodos, addTodo } from '../../redux/todo/todo-actions';
import { selectTodos, selectIsFetching, selectHasError, selectIsProcessing } from "../../redux/todo/todo-selectors";
// import {
//   useQuery,
// } from "react-query";

const Details = lazy(() => import('../details/details'));
// import { request, gql } from "graphql-request";

// const endpoint = "http://localhost:3333/graphql";

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

const FormWrapper = styled.form<{children: React.ReactNode}>`
 margin: 2rem;
 display: grid;
 grid-gap: 2rem;

 label {
   margin-right: 1rem;
 }
 fieldset {
   border: none;
 }
 fieldset > div {
    margin-top: 2rem;
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

const SubmitFormButton = styled.div`
    margin-top: 3rem;
    display: flex;
    align-content: center;
    justify-content: center;
`;

const ErrorBanner = styled.div`
   display: block;
    min-height: 1rem;
    background: #e22323;
    padding: 1rem;
    text-align: center;
    margin-top: 1rem;
    border-radius: 25px;

    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;

    @keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
    }

    @-moz-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
    }

    @-webkit-keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
    }
`;

const drawerContent = (closeDrawer, addNewTodo, hasError, isProcessing) => {
    return (
       <>
         <DrawerTitle>
           <div>
             <h2>Add a new Todo</h2>
             <CloseButton>
               <IconButton onClick={!isProcessing ? closeDrawer : null}>X</IconButton>
             </CloseButton>
           </div>
         </DrawerTitle>
         <FormWrapper>
           <fieldset disabled={isProcessing}>
             <div>
               <Label htmlFor="firstname">First name:</Label>
               <Input type="text" name="firstname" id="firstname" />
             </div>
             <div>
               <Label htmlFor="lastname">Last name:</Label>
               <Input type="text" name="lastname" id="lastname" />
             </div>
             <div>
               <Label htmlFor="age">Age:</Label>
               <Input type="text" name="age" id="age" />
             </div>
             <div>
               <Label htmlFor="address">Address:</Label>
               <Input type="text" name="address" id="address" />
             </div>
           </fieldset>
         </FormWrapper>
         <SubmitFormButton>
           <Button
             ariaLabel='Submit New Todo Form Data'
             onClick={addNewTodo}
             disabled={isProcessing || hasError}
           >
             Add New Todo
           </Button>
         </SubmitFormButton>
           {
             hasError ? <ErrorBanner>Sorry there was an error adding todo.</ErrorBanner> : null
           }
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
    const hsError = useSelector(selectHasError);
    const isProcessing = useSelector(selectIsProcessing);
    const todos = useSelector(selectTodos);

    const [isOpened, setIsOpened] = useState(false);

    const closeDrawer = () => {
      setIsOpened(false);
    }
    useEffect(() => {
      dispatch(fetchTodos());
    }, []);

    const addNewTodo = () => {
      dispatch(addTodo({
        userId: '1',
        date: '1',
        todoId: '1',
        title: '1',
        description: '1'
      }));
    };

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
                     <InverseButton
                       ariaLabel='Add Todo Button in Card'
                       ariaDescribedby='no-todo-message'
                       onClick={addNewTodo}
                     >
                       Add Todo
                     </InverseButton>
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
          isOpened ? <Drawer
            opened={isOpened}
            slide='right'
            onClose={!isProcessing ? closeDrawer : null}
          >
            {drawerContent(closeDrawer, addNewTodo, hsError, isProcessing)}
          </Drawer> : null
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
