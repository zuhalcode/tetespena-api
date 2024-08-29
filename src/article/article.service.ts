import { Injectable } from '@nestjs/common';
import { WebResponse } from 'src/model/web.model';
import { ArticleResponseDto } from './dto/article-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  create() {
    return 'This action adds a new article';
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

  async findOne(slug: string): Promise<WebResponse<ArticleResponseDto>> {
    try {
      const article = await this.prisma.article.findUniqueOrThrow({
        where: { slug },
        include: { User: { select: { name: true } } },
      });
      return { data: article, message: 'Article retrieved successfully ' };
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
