import { API_CONFIG } from '@/shared/constants/api-config.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInDTO } from '@/core/models/dto/sign-in.dto';
import { SignUpDTO } from '@/core/models/dto/sign-up.dto';
import { TokenDTO } from '@/core/models/dto/token.dto';
import { User } from '@/core/models/user.model';
import { UpdateUserDTO } from '@/core/models/dto/update-user.dto';
import { CreatePostDTO } from '@/core/models/dto/create-post.dto';
import { Post } from '@/core/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = API_CONFIG.url;
  private readonly API_PATH = API_CONFIG.paths;

  constructor(private httpClient: HttpClient) {}

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

  public editUser(updateUserDTO: UpdateUserDTO): Observable<User> {
    return this.httpClient.put<User>(
      this.API_URL + this.API_PATH.user + '/profile',
      updateUserDTO
    );
  }

  public createPost(createPostDTO: CreatePostDTO): Observable<Post> {
    return this.httpClient.post<Post>(
      this.API_URL + this.API_PATH.post,
      createPostDTO
    );
  }

  // public deleteUser(user: User): Observable<any> {
  //   return this.httpClient.post(this.USER_API_URL + '/delete', user, {
  //     observe: 'response',
  //     responseType: 'text',
  //   });
  // }

  // public uploadAvatar({ username, imageBytes }: any): Observable<any> {
  //   return this.httpClient.post(this.USER_API_URL + '/uploadAvatar', {
  //     username,
  //     imageBytes,
  //   });
  // }

  // public changeUserPassword({
  //   username,
  //   oldPassword,
  //   newPassword,
  // }: any): Observable<any> {
  //   return this.httpClient.post(
  //     this.USER_API_URL + '/changePassword',
  //     { username, oldPassword, newPassword },
  //     { observe: 'response', responseType: 'text' }
  //   );
  // }

  // public linkLibraryCard({
  //   CardNumber,
  //   Password,
  //   UserId,
  // }: any): Observable<any> {
  //   return this.httpClient.post(this.USER_API_URL + '/libraryCard', {
  //     CardNumber,
  //     Password,
  //     UserId,
  //   });
  // }

  // public getBooks(id: string = ''): Observable<any> {
  //   if (id != '') return this.httpClient.get(this.BOOK_API_URL + '/' + id);

  //   return this.httpClient.get(this.BOOK_API_URL);
  // }

  // public getTopBorrow(): Observable<any> {
  //   return this.httpClient.get(this.BOOK_API_URL + '/topBorrow');
  // }

  // public GetRandomRecommendation(): Observable<any> {
  //   return this.httpClient.get(this.BOOK_API_URL + '/randomRecommendation');
  // }

  // public getCategories(): Observable<any> {
  //   return this.httpClient.get(this.BOOK_API_URL + '/category');
  // }

  // public getAuthors(): Observable<any> {
  //   return this.httpClient.get(this.BOOK_API_URL + '/author');
  // }

  // public getPublishers(): Observable<any> {
  //   return this.httpClient.get(this.BOOK_API_URL + '/publisher');
  // }

  // public searchBooks(searchModel: SearchModel): Observable<any> {
  //   for (let i in searchModel) {
  //     if (searchModel[i] === null) searchModel[i] = '';
  //   }

  //   return this.httpClient.get(this.BOOK_API_URL + '/search', {
  //     params: searchModel,
  //   });
  // }

  // public addFavorite({ bookId, userId }: any): Observable<any> {
  //   const id = null;
  //   return this.httpClient.post(this.USER_API_URL + '/addFavorite', {
  //     id,
  //     bookId,
  //     userId,
  //   });
  // }
  // public removeFavorite({ bookId, userId }: any): Observable<any> {
  //   const id = null;
  //   return this.httpClient.post(this.USER_API_URL + '/removeFavorite', {
  //     id,
  //     bookId,
  //     userId,
  //   });
  // }
  // public isFavorite({ bookId, userId }: any): Observable<any> {
  //   const id = null;
  //   return this.httpClient.post(this.USER_API_URL + '/isFavorite', {
  //     id,
  //     bookId,
  //     userId,
  //   });
  // }
  // public getFavorite(id: string): Observable<any> {
  //   return this.httpClient.get(this.USER_API_URL + `/${id}/favorite`);
  // }

  // public borrow({
  //   cardNumber,
  //   bookId,
  //   borrowDate,
  //   returnDate,
  // }: any): Observable<any> {
  //   return this.httpClient.post(this.BOOK_API_URL + '/borrow', {
  //     id: null,
  //     cardNumber,
  //     bookId,
  //     borrowDate,
  //     returnDate,
  //   });
  // }
}
