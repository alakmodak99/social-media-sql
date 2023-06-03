/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/base.entity/base.entity';
import { Posts } from 'src/posts/entity/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// import { Replies } from './replies.entity';
@Entity()
export class Comments extends BaseEntity {
  @Column({ nullable: false })
  public userId: string;

  @Column({ nullable: false })
  public postId: string;

  @Column({ nullable: false })
  public comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  public user: User;

  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn()
  public post: Posts;

  @ManyToOne(() => Comments, (comment) => comment.replies)
  @JoinColumn()
  public parent: Comments;

  @Column({ nullable: true })
  public parentId: string;

  @OneToMany(() => Comments, (replies) => replies.parent)
  public replies: Comments[];
}
