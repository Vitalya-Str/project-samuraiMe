import { Field, Form, Formik } from "formik";
import { FC, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatorPage from "../../Common/PaginatorPage/PaginatorPage";
import { FilterType, follow, requestUsers, unfollow } from "../../Redux/Users-reducer";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getsUsers, searchTerm } from "../../Redux/Users-selectors";
import { AppDispatch } from "../../Redux/store";
import User from "../User/User";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropsType = {}

const Users: FC<PropsType> = memo((props) => {

    const totalItemsCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getsUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(searchTerm)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const [searchParams] = useSearchParams(location.search)


    useEffect(() => {
        const parsed = Object.fromEntries([...searchParams]) as { page: string, term: string, friend: string }

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }
        if (!!parsed.friend) actualFilter = { ...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
        })
    }, [filter, currentPage])

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

})

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
    const filter = useSelector(searchTerm)

    return <div>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: filter.friend }}
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
