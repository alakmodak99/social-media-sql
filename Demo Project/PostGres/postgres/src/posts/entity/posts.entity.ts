import { BaseEntity } from 'src/base.entity/base.entity';
import { Comments } from 'src/comments/entity/comments.entity';
import { Reactions } from 'src/reactions/entity/reactions.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
@Entity()
export class Posts extends BaseEntity {
  @Column({ nullable: false })
  public content: string;

  @ManyToOne(() => User, (created_by) => created_by.posts)
  @JoinColumn({ name: 'user_id' })
  public created_by: User;

  @Column({ name: 'user_id', type: 'bigint' })
  public userId: string;

  @OneToMany(() => Reactions, (likes) => likes.post)
  public likes: Reactions[];

  @OneToMany(() => Comments, (comments) => comments.post)
  public comments: Comments[];
}
