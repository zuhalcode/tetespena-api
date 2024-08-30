import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { WebResponse } from '../model/web.model';
import { ArticleResponseDto } from './dto/article-response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { generateSlug } from '../common/utils/helper';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createArticleDto: CreateArticleDto,
  ): Promise<WebResponse<ArticleResponseDto>> {
    console.log('data masuk coy : ', createArticleDto);
    const { title, content, userId } = createArticleDto;
    const slug = generateSlug(title);

    try {
      const existingArticle = await this.prisma.article.findFirst({
        where: { title },
      });

      if (existingArticle)
        throw new ConflictException('Article with same title is existing');

      console.log('aman bro');

      const newArticle = await this.prisma.article.create({
        data: {
          title: title.toLowerCase(),
          content,
          slug,
          status: 'DRAFT',
          userId,
        },

        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          cover_img: true,
          created_at: true,
          User: { select: { name: true } },
        },
      });

      return { data: newArticle, message: 'Article created successfully' };
    } catch (error) {
      console.log(error);
      // Only rethrow the original exception if it's a known one
      if (error instanceof ConflictException) throw error;

      // Throw a general internal server error for other cases
      throw new ConflictException('An unexpected error occurred');
    }
  }

  async findAll(): Promise<WebResponse<ArticleResponseDto[]>> {
    try {
      const articles: ArticleResponseDto[] = await this.prisma.article.findMany(
        { include: { User: true } },
      );

      return { data: articles, message: 'Articles retrieved successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByUserId(
    userId: string,
  ): Promise<WebResponse<ArticleResponseDto[]>> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
      });

      if (!user) throw new NotFoundException('User not found');

      const articles: ArticleResponseDto[] = await this.prisma.article.findMany(
        { where: { userId } },
      );

      return { data: articles, message: 'Articles retrieved successfully' };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
    }
  }

  async findOne(slug: string): Promise<WebResponse<ArticleResponseDto>> {
    try {
      const article = await this.prisma.article.findUniqueOrThrow({
        where: { slug },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          cover_img: true,
          created_at: true,
          userId: true,
          User: { select: { name: true } },
        },
      });
      return { data: article, message: 'Article retrieved successfully ' };
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // Handle the case where article is not found
        throw new NotFoundException('Article not found');
      } else {
        console.error('An unexpected error occurred:', error);
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async update(
    updateArticleDto: UpdateArticleDto,
    userId: string,
    slug: string,
  ): Promise<WebResponse<UpdateArticleDto>> {
    const { content, title: updatedTitle } = updateArticleDto;

    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: { userId, slug },
      });

      if (!existingArticle) throw new NotFoundException('Article not found');

      if (updatedTitle !== existingArticle.title) {
        const updatedSlug = generateSlug(updatedTitle);

        const updatedArticle = await this.prisma.article.update({
          where: { userId, slug },
          data: { title: updatedTitle, slug: updatedSlug, content },
        });

        return {
          data: updatedArticle,
          message: 'Updated article successfully',
        };
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ConflictException) throw error;

      throw new ConflictException('An unexpected error occurred');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
