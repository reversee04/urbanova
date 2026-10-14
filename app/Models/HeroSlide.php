<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'cta_text', 'cta_url', 'bg_image', 'sort_order', 'is_active'];

    protected function casts(): array { return ['is_active' => 'boolean']; }

    public function scopeActive(Builder $query): Builder { return $query->where('is_active', true)->orderBy('sort_order'); }
}
