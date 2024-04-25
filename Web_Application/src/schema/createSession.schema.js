import { number, object, string } from "yup";

export const CreateSessionSchema = object().shape({
    numberOfParticipants: number().required().min(1),
});