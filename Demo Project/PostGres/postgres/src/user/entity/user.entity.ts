/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base.entity/base.entity';
import { Comments } from 'src/comments/entity/comments.entity';
import { Posts } from 'src/posts/entity/posts.entity';
import { Reactions } from 'src/reactions/entity/reactions.entity';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ nullable: false })
  public name: string;

  @Column({ name: 'password', length: '100', nullable: false})
  public password: string;

  @OneToMany(() => Posts, (post) => post.created_by)
  public posts: Posts[];

  @OneToMany(() => Reactions, (likes) => likes.user)
  public likes: Reactions[];

  @OneToMany(() => Comments, (comments) => comments.user)
  public comments: Comments[];
}
