import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';

import { ArticleService } from './article.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleResponseDto } from './dto/article-response.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiCreatedResponse({
    description: 'Article object as response',
    type: CreateArticleDto,
    example: {
      data: {
        title:
          'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
        slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
    },
  })
  @ApiConflictResponse({
    description:
      'Article created failed because there same title with existing article',
    example: {
      message: 'Article with same title is existing',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @ApiOkResponse({
    description: 'Article object as response',
    type: ArticleResponseDto,
    example: {
      data: [
        {
          id: '538efe65-5852-4b2d-9025-9503cbd08af8',
          title:
            'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
          slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
                    text: 'Why should you have to publish your story on Medium? There are many good reasons — our simple, intuitive editor.',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          cover_img: 'image.jpg',
          created_at: '2024-08-24T04:50:35.480Z',
          status: 'DRAFT',
          userId: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
          User: {
            name: 'Zuhal Code',
          },
        },
        {
          id: '538efe65-5852-4b2d-9025-9503cbd08af8',
          title:
            'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
          slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
                    text: 'Why should you have to publish your story on Medium? There are many good reasons — our simple, intuitive editor.',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          cover_img: 'image.jpg',
          created_at: '2024-08-24T04:50:35.480Z',
          status: 'DRAFT',
          userId: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
          User: {
            name: 'Zuhal Code',
          },
        },
      ],
      message: 'Article retrieved successfully ',
    },
  })
  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @ApiOkResponse({
    description: 'Article object as response',
    type: ArticleResponseDto,
    example: {
      data: [
        {
          id: '538efe65-5852-4b2d-9025-9503cbd08af8',
          title:
            'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
          slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
                    text: 'Why should you have to publish your story on Medium? There are many good reasons — our simple, intuitive editor.',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          cover_img: 'image.jpg',
          created_at: '2024-08-24T04:50:35.480Z',
          status: 'DRAFT',
          userId: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
          User: {
            name: 'Zuhal Code',
          },
        },
        {
          id: '538efe65-5852-4b2d-9025-9503cbd08af8',
          title:
            'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
          slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
                    text: 'Why should you have to publish your story on Medium? There are many good reasons — our simple, intuitive editor.',
                    type: 'text',
                  },
                ],
              },
            ],
          },
          cover_img: 'image.jpg',
          created_at: '2024-08-24T04:50:35.480Z',
          status: 'DRAFT',
          userId: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
          User: {
            name: 'Zuhal Code',
          },
        },
      ],
      message: 'Article retrieved successfully ',
    },
  })
  @Get('users/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.articleService.findAllByUserId(userId);
  }

  @ApiCreatedResponse({
    description: 'Article object as response',
    example: {
      data: {
        id: '538efe65-5852-4b2d-9025-9503cbd08af8',
        title:
          'how our quality guidelines incentivize your best writing — and how we curate those stories for our readers',
        slug: 'how-our-quality-guidelines-incentivize-your-best-writing-and-how-we-curate-those-stories-for-our-readers',
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
                  text: 'Why should you have to publish your story on Medium? There are many good reasons — our simple, intuitive editor.',
                  type: 'text',
                },
              ],
            },
          ],
        },
        cover_img: 'image.jpg',
        created_at: '2024-08-24T04:50:35.480Z',
        status: 'DRAFT',
        userId: 'user_24c288d2-7ad1-4724-a88d-637171b60c3f',
        User: {
          name: 'Zuhal Code',
        },
      },
      message: 'Article retrieved successfully ',
    },
  })
  @ApiNotFoundResponse({
    description: 'No article found',
    example: {
      message: 'Article not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':slug')
  findOne(
    @Param('slug')
    slug: string,
  ) {
    return this.articleService.findOne(slug);
  }

  @Patch(':userId/:slug')
  update(
    @Body() updateArticleDto: UpdateArticleDto,
    @Param('userId') userId: string,
    @Param('slug') slug: string,
  ) {
    return this.articleService.update(updateArticleDto, userId, slug);
  }
}
