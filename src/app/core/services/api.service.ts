import { API_CONFIG } from '@/shared/constants/api-config.constant';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInDTO } from '@/core/models/dto/sign-in.dto';
import { SignUpDTO } from '@/core/models/dto/sign-up.dto';
import { TokenDTO } from '@/core/models/dto/token.dto';
import { User } from '@/core/models/user.model';
import { UpdateUserDTO } from '@/core/models/dto/update-user.dto';
import { CreatePostDTO } from '@/core/models/dto/create-post.dto';
import { Post } from '@/core/models/post.model';
import { Comment } from '@/core/models/comment.model';
import { Tag } from '@/core/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = API_CONFIG.url;
  private readonly API_PATH = API_CONFIG.paths;
  private genericHttpClient: HttpClient;

  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.genericHttpClient = new HttpClient(handler);
  }

  public get(url: string): Observable<unknown> {
    return this.genericHttpClient.get(url);
  }

  public isEmailAvailable(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.API_URL + this.API_PATH.user + `/isEmailAvailable`,
      { email }
    );
  }

  public isUsernameAvailable(username: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.API_URL + this.API_PATH.user + `/isUsernameAvailable`,
      { username }
    );
  }

  public signin(signInDTO: SignInDTO): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(
      this.API_URL + this.API_PATH.auth + '/signin',
      signInDTO
    );
  }

  public signup(signUpDTO: SignUpDTO): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(
      this.API_URL + this.API_PATH.auth + '/signup',
      signUpDTO
    );
  }

  public signout(): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.API_URL + this.API_PATH.auth + '/signout',
      {}
    );
  }

  public refreshAccessToken(): Observable<TokenDTO> {
    return this.httpClient.post<TokenDTO>(
      this.API_URL + this.API_PATH.auth + '/refresh',
      {}
    );
  }

  public getProfile(username?: string): Observable<User> {
    return this.httpClient.get<User>(
      this.API_URL +
        this.API_PATH.user +
        `/profile${username ? `/${username}` : ''}`
    );
  }

  public updateProfile(updateUserDTO: UpdateUserDTO): Observable<User> {
    return this.httpClient.put<User>(
      this.API_URL + this.API_PATH.user + '/profile',
      updateUserDTO
    );
  }

  public followUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.API_URL + this.API_PATH.user + '/follow',
      { userId }
    );
  }

  public unfollowUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.API_URL + this.API_PATH.user + '/unfollow',
      { userId }
    );
  }

  public createPost(createPostDTO: CreatePostDTO): Observable<Post> {
    return this.httpClient.post<Post>(
      this.API_URL + this.API_PATH.post,
      createPostDTO
    );
  }

  public getAllPosts(skip: number, take: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      this.API_URL + this.API_PATH.post + `?skip=${skip}&take=${take}`
    );
  }

  public getAllPostsByUsername(
    username: string,
    skip: number,
    take: number
  ): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      this.API_URL +
        this.API_PATH.post +
        `/user/${username}?skip=${skip}&take=${take}`
    );
  }

  public getPostById(id: string): Observable<Post> {
    return this.httpClient.get<Post>(
      this.API_URL + this.API_PATH.post + `/${id}`
    );
  }

  public searchPost(
    query: string,
    skip: number,
    take: number
  ): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      this.API_URL +
        this.API_PATH.post +
        `/search?query=${query}&skip=${skip}&take=${take}`
    );
  }

  public getAllComments(postId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      this.API_URL + this.API_PATH.post + `/${postId}` + this.API_PATH.comment
    );
  }

  public getAllCommentsByUsername(username: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      this.API_URL + this.API_PATH.user + this.API_PATH.comment + `/${username}`
    );
  }

  public submitComment(
    postId: string,
    formData: { body: string }
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.API_URL + this.API_PATH.post + `/${postId}` + this.API_PATH.comment,
      formData
    );
  }

  public getAllTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(
      this.API_URL + this.API_PATH.post + `/tags`
    );
  }
}
