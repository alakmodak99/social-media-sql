import { BaseEntity } from 'src/base.entity/base.entity';
import { Posts } from 'src/posts/entity/posts.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity()
export class Reactions extends BaseEntity {
  @Column({ nullable: false })
  public userId: string;

  @Column({ nullable: false })
  public postId: string;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  public user: User;

  @ManyToOne(() => Posts, (post) => post.likes)
  @JoinColumn()
  public post: Posts;
}
