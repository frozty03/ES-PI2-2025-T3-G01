--Pedro Henrique Bonetto da Costa
--Miguel Afonso Castro de Almeida

-- =========================================================
--
-- 1. Usuários
--
-- =========================================================

CREATE TABLE public."Users"
(
    id uuid NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(70) NOT NULL,
    telefone_celular character varying(20) NOT NULL,
    senha character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Users"
    OWNER to root;

-- =========================================================
--
-- 2. Instituições
--
-- =========================================================

CREATE TABLE public."Instituicoes"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Instituicoes"
    OWNER to root;

-- =========================================================
--
-- 3. Atua (Usuários x Instituições)
--
-- =========================================================

CREATE TABLE public."Atua_User_Instituicao"
(
    id_user uuid NOT NULL,
    id_instituicao uuid NOT NULL,
    PRIMARY KEY (id_user, id_instituicao),
    CONSTRAINT fk_user FOREIGN KEY (id_user)
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES public."Instituicoes" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Atua_User_Instituicao"
    OWNER to root;

-- =========================================================
--
-- 4. Cursos
--
-- =========================================================

CREATE TABLE public."Curso"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Curso"
    OWNER to root;

-- =========================================================
--
-- 5. Oferece (Curso Instituição)
--
-- =========================================================

CREATE TABLE public."Oferece_Curso_Instituicao"
(
    id_instituicao uuid NOT NULL,
    id_curso uuid NOT NULL,
    PRIMARY KEY (id_instituicao, id_curso),
    CONSTRAINT fk_curso FOREIGN KEY (id_curso)
        REFERENCES public."Curso" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_instituicao FOREIGN KEY (id_instituicao)
        REFERENCES public."Instituicoes" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Oferece_Curso_Instituicao"
    OWNER to root;

-- =========================================================
--
-- 6. Disciplinas
--
-- =========================================================

CREATE TABLE public."Disciplinas"
(
    id uuid NOT NULL,
    cod integer NOT NULL,
    nome character varying(150) NOT NULL,
    sigla character varying(10) NOT NULL,
    periodo character varying(2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (cod)
);

ALTER TABLE IF EXISTS public."Disciplinas"
    OWNER to root;

-- =========================================================
--
-- 7. Turmas
--
-- =========================================================

CREATE TABLE public."Turmas"
(
    id uuid NOT NULL,
    cod integer NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (cod)
);

ALTER TABLE IF EXISTS public."Turmas"
    OWNER to root;

-- =========================================================
--
-- 8. Alunos
--
-- =========================================================

CREATE TABLE public."Alunos"
(
    id uuid NOT NULL,
    ra character varying(8) NOT NULL,
    nome character varying(150) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (ra)
);

ALTER TABLE IF EXISTS public."Alunos"
    OWNER to root;

-- =========================================================
--
-- 9. Participação (Aluno x Turma)
--
-- =========================================================

CREATE TABLE public."Participa_Aluno_Turma"
(
    id_aluno uuid NOT NULL,
    id_turma uuid NOT NULL,
    PRIMARY KEY (id_turma, id_aluno),
    CONSTRAINT fk_aluno FOREIGN KEY (id_aluno)
        REFERENCES public."Alunos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Participa_Aluno_Turma"
    OWNER to root;

-- =========================================================
--
-- 10. Componentes de Nota
--
-- =========================================================

CREATE TABLE public."Componente_Nota"
(
    id uuid NOT NULL,
    nome character varying(150) NOT NULL,
    peso numeric(4, 2) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Componente_Nota"
    OWNER to root;

-- =========================================================
--
-- 11. Entidade Associativa: Notas (Aluno + Turma + Componente)
--
-- =========================================================

CREATE TABLE public."Notas_Aluno_Turma_Componente"
(
    id uuid NOT NULL,
    id_turma uuid NOT NULL,
    id_aluno uuid NOT NULL,
    id_componente uuid NOT NULL,
    valor numeric(4, 2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_aluno FOREIGN KEY (id_aluno)
        REFERENCES public."Alunos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_componente FOREIGN KEY (id_componente)
        REFERENCES public."Componente_Nota" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Notas_Aluno_Turma_Componente"
    OWNER to root;

-- =========================================================
--
-- 12. Compõe (Disciplina x Curso)
--
-- =========================================================

CREATE TABLE public."Compoe_Disciplina_Curso"
(
    id_disciplina uuid NOT NULL,
    id_curso uuid NOT NULL,
    PRIMARY KEY (id_disciplina, id_curso),
    CONSTRAINT fk_curso FOREIGN KEY (id_curso)
        REFERENCES public."Curso" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_disciplina FOREIGN KEY (id_disciplina)
        REFERENCES public."Disciplinas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Compoe_Disciplina_Curso"
    OWNER to root;


-- Alteração

ALTER TABLE IF EXISTS public."Notas_Aluno_Turma_Componente"
    ADD CONSTRAINT nota_0_ate_10 CHECK (valor BETWEEN 0 AND 10);

-- =========================================================
--
-- 13. Cria (Turma x Disciplina)
--
-- =========================================================

CREATE TABLE public."Cria_Turmas_Disciplina"
(
    id_turma uuid NOT NULL,
    id_disciplina uuid NOT NULL,
    PRIMARY KEY (id_turma, id_disciplina),
    CONSTRAINT fk_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_disciplina FOREIGN KEY (id_disciplina)
        REFERENCES public."Disciplinas" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public."Cria_Turmas_Disciplina"
    OWNER to root;

ALTER TABLE public."Componente_Nota"
ADD COLUMN id_disciplina uuid NOT NULL,
ADD CONSTRAINT fk_disciplina_componente FOREIGN KEY (id_disciplina)
    REFERENCES public."Disciplinas" (id)
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID,
ADD CONSTRAINT unq_nome_disciplina UNIQUE (id_disciplina, nome);

ALTER TABLE public."Componente_Nota"
ADD COLUMN sigla character varying(10) NOT NULL,
ADD COLUMN descricao character varying(255) NOT NULL;



-- tabela de log
drop table public."Log_Auditoria_Notas";
CREATE TABLE public."Log_Auditoria_Notas"
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    id_turma uuid NOT NULL,
    id_componente_nota uuid NOT NULL,
    id_aluno uuid NOT NULL,
    valor_antigo numeric(4, 2),
    valor_novo numeric(4, 2),
    usuario character varying(100) NOT NULL,
    data_hora timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_log_turma FOREIGN KEY (id_turma)
        REFERENCES public."Turmas" (id),
    CONSTRAINT fk_log_aluno FOREIGN KEY (id_aluno)
        REFERENCES public."Alunos" (id),
    CONSTRAINT fk_log_componente FOREIGN KEY (id_componente_nota)
        REFERENCES public."Componente_Nota" (id)
);

-- funcao
CREATE OR REPLACE FUNCTION auditar_notas() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public."Log_Auditoria_Notas" (
        id_turma,
        id_componente_nota,
        id_aluno,
        valor_antigo,
        valor_novo,
        usuario
    ) VALUES (
        NEW.id_turma,
        NEW.id_componente_nota,
        NEW.id_aluno,
        CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE OLD.valor END,
        NEW.valor,
        COALESCE(current_setting('app.usuario_atual', TRUE), 'Sistema')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- trigger em si
DROP TRIGGER IF EXISTS trigger_auditar_notas ON public."Notas_Aluno_Turma_Componente";

CREATE TRIGGER trigger_auditar_notas
AFTER INSERT OR UPDATE ON public."Notas_Aluno_Turma_Componente"
FOR EACH ROW
EXECUTE FUNCTION auditar_notas();

ALTER TABLE public."Log_Auditoria_Notas"
DROP CONSTRAINT fk_log_aluno;

ALTER TABLE public."Log_Auditoria_Notas"
ADD CONSTRAINT fk_log_aluno
FOREIGN KEY (id_aluno)
REFERENCES public."Alunos"(id)
ON DELETE CASCADE;