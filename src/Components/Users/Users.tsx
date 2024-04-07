import { FC } from "react";
import PaginatorPage from "../../Common/PaginatorPage/PaginatorPage";
import User from "../User/User";
import { UserType } from "../../types/types";
import { Field, Form, Formik } from "formik";
import { FilterType } from "../../Redux/Users-reducer";

type TypeProps = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onCurrentPage: (pageNumber: number) => void
    users: UserType[]
    followingInProgress: number[]
    unfollow: (userID: number) => void
    follow: (userID: number) => void
    searchFormik: (term: FilterType) => void
}
const Users: FC<TypeProps> = ({ totalItemsCount, pageSize, currentPage, onCurrentPage, searchFormik, ...props }) => {

    return <div>
        <FormikUsers searchFormik={searchFormik} />

        <PaginatorPage totalItemsCount={totalItemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onCurrentPage={onCurrentPage} />


        {props.users.map(u => <User user={u} id={u.id} key={u.id} {...props} />)}
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
            friend: values.friend === "null" ? null: values.friend === "true" ? true : false  
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
