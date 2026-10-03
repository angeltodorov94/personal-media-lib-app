import { Gender } from "@/types/person";

const genderNames: Record<Gender, string> = {
  0: "Not specified",
  1: "Female",
  2: "Male",
  3: "Non-binary",
};

export const getGenderName = (gender: Gender) => genderNames[gender];
