import {Header} from "../Header/Header";
import {Alert, Fade} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {hideAlert} from "../../store/reducers/alertSlice";

export const MainLayout = (props) => {
  const dispatch = useDispatch();
  const {children} = props;
  const {
    show,
    title,
    msg,
    variant,
  } = useSelector(
    (state) => state.alertReducer
  );

  return (
    <>
      <Header>

      </Header>
      <main>
        {show && (
          <Alert key={variant} variant={variant} onClose={() => dispatch(hideAlert())} dismissible transition={Fade}>
            {msg}
          </Alert>
        // <Alert variant="danger" onClose={() => dispatch(hideAlert())} dismissible>
        //   <Alert.Heading>{title}</Alert.Heading>
        //   <p>
        //     {msg}
        //   </p>
        // </Alert>
        )}
        {children}
      </main>
    </>
  )
}

export default MainLayout;