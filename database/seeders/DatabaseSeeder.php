<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use App\Models\Project;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'username' => 'testuser', 'password' => 'password', 'admin_role' => 'super_admin']
        );
        if ($user->admin_role !== 'super_admin') {
            $user->update(['admin_role' => 'super_admin']);
        }

        if (! $user->personalTeam()) {
            app(\App\Actions\Teams\CreateTeam::class)->handle($user, "Test User's Team", isPersonal: true);
        }

        $images = [
            'photo-1506744038136-46273834b3fb', 'photo-1470071459604-3b5ec3a7fe05',
            'photo-1426604966848-d7adac402bff', 'photo-1518005020951-eccb494ad742',
            'photo-1500382017468-9049fed747ef', 'photo-1548839140-29a749e1cf4e',
        ];

        if (! HeroSlide::exists()) {
        foreach ([
            ['Trusted globally to deliver innovative, sustainable solutions', 'Provider of consultancy, technical services, research, innovation and training to clients in water, environment, and urban planning across Malawi and Southern Africa.', 'Explore what we do', '/services'],
            ['Pioneering clean energy and environmental stewardship', 'Empowering communities and businesses with ecological strategy, sustainability frameworks, and resource management solutions.', 'Discover our projects', '/projects'],
            ['Building resilient water and waste infrastructure', 'Transforming systems through research-backed engineering, policy advisory, and technology for future generations.', 'Learn about our impact', '/projects'],
            ['Delivering rigorous safeguards compliance across the region', 'Expert resettlement planning, environmental and social impact assessment, and international safeguards alignment.', 'Meet our team', '/team'],
            ['Inclusive development advisory rooted in community', 'Integrating gender, youth, and vulnerable household perspectives into every project phase.', 'Our approach', '/about'],
            ['Spatial intelligence powering smarter planning decisions', 'GIS-led analysis, drone mapping, parcel surveys, and digital tools for land use and infrastructure planning.', 'View our services', '/services'],
        ] as $i => [$title, $description, $cta, $url]) {
            HeroSlide::create(['title' => $title, 'description' => $description, 'cta_text' => $cta, 'cta_url' => $url, 'bg_image' => "https://images.unsplash.com/{$images[$i]}?q=80&w=2000&auto=format&fit=crop", 'sort_order' => $i + 1, 'is_active' => true]);
        }
        }

        if (! Project::exists()) {
        $projects = [
            ['Climate-Resilient Land Use and Flood Zoning', 'Environmental Affairs Department (EAD) / UNEP', 'Malawi', '2025 – Ongoing', 'Climate & Planning', 'Supporting climate-resilient land use and flood zoning, including flood and parcel data analysis and climate adaptation indicators.', ['Zoning and flood data analysis', 'Land use planning policy support']],
            ['Caála Logistics Platform Feasibility Study', 'Regional Logistics Development Partners', 'Caála, Angola', '2025', 'Logistics & Infrastructure', 'Serving as ESIA Lead and Resettlement Specialist, aligned with World Bank Environmental and Social Standards.', ['Environmental and social impact assessment', 'Stakeholder consultation and livelihood planning']],
            ['Salima - Lilongwe Water Project', 'Lilongwe Water Board', 'Salima to Lilongwe, Malawi', 'Pre-feasibility Stage', 'Water & Utilities', 'Environmental and social analysis, community development planning, and safeguards review for bulk water infrastructure.', ['Environmental and social analysis', 'Community development planning']],
            ['Shire Valley Transformation Programme', 'Ministry of Agriculture / Irrigation Development', 'Lower Shire Valley, Malawi', 'Major Irrigation Assignment', 'Agriculture & Resettlement', 'RAP consultancy and leadership for major irrigation canal assignments under World Bank and AfDB safeguards.', ['Socio-economic surveys and asset inventories', 'Entitlement and livelihood restoration planning']],
            ['Fuel Retail and Energy Compliance', 'Brighto Filling Station', 'Malawi', 'Completed', 'Energy & Compliance', 'Environmental safeguards and regulatory compliance support leading to MEPA clearance.', ['MEPA environmental clearance', 'Regulatory approval support']],
            ['Nacala Corridor Railway Project', 'Regional Rail Authorities', 'Malawi – Mozambique Corridor', 'Infrastructure Assignment', 'Logistics & Infrastructure', 'Land acquisition, resettlement, stakeholder engagement, and social development coordination for railway rehabilitation.', ['Resettlement and land acquisition', 'Community engagement']],
        ];
        foreach ($projects as $i => [$title, $client, $location, $year, $category, $scope, $achievements]) {
            Project::create(['title' => $title, 'client' => $client, 'location' => $location, 'year' => $year, 'category' => $category, 'scope_summary' => $scope, 'achievements' => $achievements, 'image' => "https://images.unsplash.com/{$images[$i]}?q=80&w=1200&auto=format&fit=crop", 'featured' => true, 'sort_order' => $i + 1, 'is_active' => true]);
        }
        }

        if (! TeamMember::exists()) {
        $members = [
            ['Hastings Jolotie Nyirenda', 'Founder and Lead Consultant', 'Urban and regional planner, safeguards and resettlement specialist, and GIS practitioner with more than 15 years of experience.'],
            ['Langson Hawonga', 'Senior Environmental, Health and Safety Expert', 'Occupational Health and Safety and Environmental Health specialist with a Bachelor of Science from the University of Malawi.'],
            ['Walusungu Chipeta', 'Senior Social and Gender Safeguards Specialist', 'Specialist in stakeholder engagement, land acquisition, resettlement, grievance management, and gender risk management.'],
            ['Albert Rozario', 'Senior Resettlement & Social Safeguards Specialist', 'Specialist in land acquisition, RAP preparation, livelihood restoration, and safeguards compliance.'],
            ['William Rozario', 'Social Development, Gender, & Field Safeguards Specialist', 'Experienced in RAP implementation, ESIA support, and stakeholder engagement on major infrastructure projects.'],
            ['Aisha Balakasi', 'Civil Engineer and Infrastructure Specialist', 'Civil Engineer experienced in infrastructure planning, design review, construction supervision, and contract management.'],
            ['Dr Geoffrey Chiyuzga Singini', 'Senior M&E, Statistics and Data Systems Specialist', 'Statistician with 19 years of experience in study design, M&E systems, statistical modeling, and data quality.'],
            ['Cynthia Anna Phiri', 'GIS Specialist and Land Surveyor', 'GIS specialist and land surveyor with a BSc in Land Surveying and drone technology training.'],
            ['Thomas Magaisa', 'Senior Agriculture, Livelihoods & Natural Resources Specialist', 'Agriculture, natural resources, climate resilience, WASH, and livelihoods specialist with over 20 years of experience.'],
        ];
        foreach ($members as $i => [$name, $role, $description]) {
            TeamMember::create(['name' => $name, 'role' => $role, 'description' => $description, 'image' => "https://images.unsplash.com/{$images[$i % count($images)]}?q=80&w=800&auto=format&fit=crop", 'sort_order' => $i + 1, 'is_active' => true]);
        }
        }
    }
}
