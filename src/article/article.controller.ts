import { Controller, Get, Post, Param, Delete } from '@nestjs/common';

import { ArticleService } from './article.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create() {
    return this.articleService.create();
  }

  @ApiCreatedResponse({
    description: 'Article object as response',
    example: {
      email: '123456789',
      title: 'zuhal',
      slug: 'code',
      content: {
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
      cover_img: 'image.jpg',
      created_at: '2022-12-04',
    },
  })
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @ApiCreatedResponse({
    description: 'Article object as response',
    example: {
      email: 'zuhal@gmail.com',
      firstName: 'zuhal',
      lastName: 'code',
      name: 'zuhal code',
    },
  })
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articleService.findOne(slug);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
