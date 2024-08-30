import { ApiProperty } from '@nestjs/swagger';
import { ArticleStatus } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsEnum, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    example: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example:
      'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'left',
          },
          content: [
            {
              text: 'Why should you publish your story on Medium? There are many good reasons — our simple, intuitive editor',
              type: 'text',
            },
          ],
        },
      ],
    },
  })
  @IsJSON()
  content: JsonValue;

  @ApiProperty({
    example: 'image.jpg',
  })
  @IsOptional()
  @IsString()
  cover_img?: string;

  @IsEnum(ArticleStatus)
  @IsOptional()
  status: ArticleStatus;
}
