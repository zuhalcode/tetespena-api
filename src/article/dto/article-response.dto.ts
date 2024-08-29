import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsJSON, IsString } from 'class-validator';

export class ArticleResponseDto {
  @ApiProperty({
    example: '123456789',
  })
  @IsString()
  id: string;

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
  @IsString()
  cover_img: string;
}
