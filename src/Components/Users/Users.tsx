import { Field, Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatorPage from "../../Common/PaginatorPage/PaginatorPage";
import { FilterType, follow, requestUsers, unfollow } from "../../Redux/Users-reducer";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getsUsers, searchTerm } from "../../Redux/Users-selectors";
import { AppDispatch } from "../../Redux/store";
import User from "../User/User";

type PropsType = {}

const Users: FC<PropsType> = (props) => {

    const totalItemsCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getsUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(searchTerm)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onCurrentPage = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const follows = (userID: number) => {
        dispatch(follow(userID))
    }
    const unfollows = (userID: number) => {
        dispatch(unfollow(userID))
    }
    const searchFormik = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    };

    return <div>
        <FormikUsers searchFormik={searchFormik} />

        <PaginatorPage totalItemsCount={totalItemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onCurrentPage={onCurrentPage} />


        {users.map(u => <User user={u} id={u.id} key={u.id} followingInProgress={followingInProgress} follow={follows} unfollow={unfollows} {...props} />)}
    </div>

}



const validateFormik = (values: any) => {
    const errors = {};
    return errors;
}

type FormikType = {
    searchFormik: (term: FilterType) => void
}

type FormType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

const FormikUsers: FC<FormikType> = ({ searchFormik }) => {

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }

        searchFormik(filter)
        setSubmitting(false);
    }

    return <div>
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={validateFormik}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All Users</option>
                        <option value="true">Friends</option>
                        <option value="false">not friends</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>

                </Form>
            )}
        </Formik>
    </div>
}
export default Users
