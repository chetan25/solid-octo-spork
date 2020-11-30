import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import {Switch, Route, useRouteMatch, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import {
  Header, Spinner,
  Button, InverseButton,
  Card, CardBody, CardFooter, Drawer
} from '@cd-workspace/ui';
import AddTodoModal from '../../components/add-todo-modal';
import { fetchTodos, addTodo, resetFormState, deleteTodo } from '../../redux/todo/todo-actions';
import { ITodo } from '../../interfaces/user';
import { selectTodos, selectIsFetching, selectHasError, selectIsProcessing, selectAddSuccess, selectIsDeleting } from "../../redux/todo/todo-selectors";
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

// const ErrorBanner = styled.div`
//    display: block;
//     min-height: 1rem;
//     background: #e22323;
//     padding: 1rem;
//     text-align: center;
//     margin-top: 1rem;
//     border-radius: 25px;
//
//     animation: fadeIn ease 1s;
//     -webkit-animation: fadeIn ease 1s;
//     -moz-animation: fadeIn ease 1s;
//     -o-animation: fadeIn ease 1s;
//     -ms-animation: fadeIn ease 1s;
//
//     @keyframes fadeIn {
//       0% {opacity:0;}
//       100% {opacity:1;}
//     }
//
//     @-moz-keyframes fadeIn {
//       0% {opacity:0;}
//       100% {opacity:1;}
//     }
//
//     @-webkit-keyframes fadeIn {
//       0% {opacity:0;}
//       100% {opacity:1;}
//     }
// `;

const CardWrapper = styled(Card)`
    min-height: 10rem;
    background: #e06767;
    color: black;
    font-weight: bold;
    font-size: 20px;
    margin: 2rem;
    padding: 1rem;
    width: auto;
`;

const CardHeader = styled.div`
    font-size: 30px;
    border-bottom: 1px solid black;
`;

const CardSection = styled.div`
  margin-top: 1rem;
  font-weight: 500;
`;

const CardFooterWrapper = styled(CardFooter)`
  border: none;
  text-align: end;
`;

const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;


const DeleteSpinnerWrapper = styled.div`
    height: 100vh;
    z-index: 200;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
`;

const DeletingSpinner =  styled.div`
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid blue;
    border-right: 16px solid green;
    border-bottom: 16px solid red;
    width: 120px;
    height: 120px;
     animation: spin 2s linear infinite;
    -webkit-animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
       0% { -webkit-transform: rotate(0deg); }
       100% { -webkit-transform: rotate(360deg); }
    }

   @keyframes spin {
      0% { transform: rotate(0deg); }
     100% { transform: rotate(360deg); }
  }
`;

export const Home = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const isFetching = useSelector(selectIsFetching);
    const hasError = useSelector(selectHasError);
    const isProcessing = useSelector(selectIsProcessing);
    const isDeleting = useSelector(selectIsDeleting);
    const addSuccessFull = useSelector(selectAddSuccess);
    const todos = useSelector(selectTodos);
    console.log(todos, 'todos present');

    const [isOpened, setIsOpened] = useState(false);

    const closeDrawer = () => {
      dispatch(resetFormState());
      setIsOpened(false);
    }
    useEffect(() => {
      dispatch(fetchTodos());
    }, []);

    const addNewTodo = (todo: ITodo) => {
      dispatch(addTodo(todo));
    };

    const deleteTodoItem = (id: string) => {
      dispatch(deleteTodo(id));
      console.log(id);
    };

    const renderContent = () => {
      return <>
        {
          todos.length > 0 ?
            <>
              <AddButtonWrapper>
                <Button ariaLabel='Add New Todo' ariaDescribedby='no-todo-message' handleClick={() => setIsOpened(true)}>
                  Add New Todo
                </Button>
              </AddButtonWrapper>
              {
                todos.map((todo: ITodo, key) => {
                  return (
                    <CardWrapper key={key} ariaLabel={todo.title}>
                      <CardBody>
                        <CardHeader>{todo.title}</CardHeader>
                        <CardSection>Description - {todo.description}</CardSection>
                        <CardSection>Actions - {todo.actions}</CardSection>
                        <CardSection>End Goal - {todo.endGoal}</CardSection>
                      </CardBody>
                      <CardFooterWrapper>
                        <Button handleClick={(_) => deleteTodoItem(todo.id)}>Delete</Button>
                      </CardFooterWrapper>
                    </CardWrapper>
                  )
                })
              }
              {
                isDeleting ? <DeleteSpinnerWrapper><DeletingSpinner /></DeleteSpinnerWrapper>: null
              }
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
                       handleClick={() => setIsOpened(true)}
                     >
                       Add Todo
                     </InverseButton>
                   </div>
                 </CardBody>
               </Card>
               <div id='button-wrapper'>
                 <Button ariaLabel='Add New Todo' ariaDescribedby='no-todo-message' handleClick={() => setIsOpened(true)}>
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
            <AddTodoModal
              closeDrawer={closeDrawer}
              addNewTodo={addNewTodo}
              hasError={hasError}
              isProcessing={isProcessing}
              addSuccessFull={addSuccessFull}
            />
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
