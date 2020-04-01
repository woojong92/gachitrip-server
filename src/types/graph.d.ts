export const typeDefs = ["type CreateBoardResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateBoard(title: String!, text: String!, files: [String!]!): CreateBoardResponse!\n  DeleteBoard(id: String!): DeleteBoardResponse!\n  UpdateBoard(id: String!, title: String!, text: String!): Board!\n  CheckValidEmail(email: String!): CheckValidEmailResponse!\n  CompleteEmailVerification(key: String!, email: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String, lastName: String, username: String!, email: String!, password: String!, birth: String!, nationality: String!, gender: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  RequestEmailVerification(email: String!): RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  UpdateMyProfile(firstName: String, lastName: String, email: String, password: String, profilePhoto: String, age: Int): UpdateMyProfileResponse!\n}\n\ntype DeleteBoardResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Query {\n  ListBoard: [Board!]!\n  ReadBoard(id: String!): Board!\n  GetMyProfile: GetMyProfileResponse!\n  user: User\n}\n\ntype Board {\n  id: Int!\n  title: String!\n  text: String!\n  files: [BoardFile]\n  author: User!\n  likes: [BoardLike]\n  comments: [BoardComment]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype BoardComment {\n  id: Int!\n  text: String!\n  user: User!\n  board: Board!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype BoardFile {\n  id: Int!\n  url: String!\n  board: Board!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype BoardLike {\n  id: Int!\n  user: User!\n  Board: Board!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Chat {\n  id: Int!\n  messages: [Message]!\n  participants: [User]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Ride {\n  id: Int!\n  status: String!\n  pickUpAddress: String!\n  pickUpLat: Float!\n  pickUpLng: Float!\n  dropOffAddress: String!\n  dropOffLat: Float!\n  dropOffLng: Float!\n  price: Float!\n  distance: String!\n  driver: User!\n  passagnger: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CheckValidEmailResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  avatar: String\n  username: String!\n  firstName: String\n  lastName: String\n  email: String!\n  password: String!\n  birth: String!\n  gender: String!\n  nationality: String!\n  following: [User]\n  followers: [User]\n  boards: [Board]\n  boardLikes: [BoardLike]\n  boardComments: [BoardComment]\n  withs: [With]\n  withLikes: [WithLike]\n  withComments: [WithComment]\n  chats: [Chat]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype With {\n  id: Int!\n  title: String!\n  text: String!\n  files: [WithFile]\n  author: User\n  isUnisex: Boolean\n  unisex: Int\n  male: Int\n  female: Int\n  dayTrip: Boolean\n  dateFrom: String\n  dateTo: String\n  abroad: Boolean!\n  address: String\n  latitude: Float\n  longitude: Float\n  isCompeted: Boolean\n  likes: [WithLike]\n  comments: [WithComment]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WithComment {\n  id: Int!\n  text: String!\n  user: User!\n  with: With!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WithFile {\n  id: Int!\n  url: String!\n  with: With!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WithLike {\n  id: Int!\n  user: User!\n  with: With!\n  createdAt: String\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  ListBoard: Array<Board>;
  ReadBoard: Board;
  GetMyProfile: GetMyProfileResponse;
  user: User | null;
}

export interface ReadBoardQueryArgs {
  id: string;
}

export interface Board {
  id: number;
  title: string;
  text: string;
  files: Array<BoardFile> | null;
  author: User;
  likes: Array<BoardLike> | null;
  comments: Array<BoardComment> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface BoardFile {
  id: number;
  url: string;
  board: Board;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  avatar: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password: string;
  birth: string;
  gender: string;
  nationality: string;
  following: Array<User> | null;
  followers: Array<User> | null;
  boards: Array<Board> | null;
  boardLikes: Array<BoardLike> | null;
  boardComments: Array<BoardComment> | null;
  withs: Array<With> | null;
  withLikes: Array<WithLike> | null;
  withComments: Array<WithComment> | null;
  chats: Array<Chat> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface BoardLike {
  id: number;
  user: User;
  Board: Board;
  createdAt: string;
  updatedAt: string | null;
}

export interface BoardComment {
  id: number;
  text: string;
  user: User;
  board: Board;
  createdAt: string;
  updatedAt: string | null;
}

export interface With {
  id: number;
  title: string;
  text: string;
  files: Array<WithFile> | null;
  author: User | null;
  isUnisex: boolean | null;
  unisex: number | null;
  male: number | null;
  female: number | null;
  dayTrip: boolean | null;
  dateFrom: string | null;
  dateTo: string | null;
  abroad: boolean;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  isCompeted: boolean | null;
  likes: Array<WithLike> | null;
  comments: Array<WithComment> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface WithFile {
  id: number;
  url: string;
  with: With;
  createdAt: string;
  updatedAt: string | null;
}

export interface WithLike {
  id: number;
  user: User;
  with: With;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface WithComment {
  id: number;
  text: string;
  user: User;
  with: With;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message>;
  participants: Array<User>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateBoard: CreateBoardResponse;
  DeleteBoard: DeleteBoardResponse;
  UpdateBoard: Board;
  CheckValidEmail: CheckValidEmailResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface CreateBoardMutationArgs {
  title: string;
  text: string;
  files: Array<string>;
}

export interface DeleteBoardMutationArgs {
  id: string;
}

export interface UpdateBoardMutationArgs {
  id: string;
  title: string;
  text: string;
}

export interface CheckValidEmailMutationArgs {
  email: string;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
  email: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  password: string;
  birth: string;
  nationality: string;
  gender: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface RequestEmailVerificationMutationArgs {
  email: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  profilePhoto: string | null;
  age: number | null;
}

export interface CreateBoardResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteBoardResponse {
  ok: boolean;
  error: string | null;
}

export interface CheckValidEmailResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Ride {
  id: number;
  status: string;
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  driver: User;
  passagnger: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
